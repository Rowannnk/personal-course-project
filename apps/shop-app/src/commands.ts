import { Command, CommanderError } from "commander"
import inquirer from "inquirer"

import {
  isMembershipTier,
  type MembershipTier,
} from "@shop/loyalty-core/loyalty"

import { createMember, getMembers } from "./services/members.js"

const program = new Command()

program
  .name("shop-loyalty")
  .description("A command-line tool for managing shop memberships")
  .showHelpAfterError()

program.exitOverride()

program
  .command("add")
  .description("Add members to a membership tier")
  .argument("<name>", "Member name")
  .argument("<tier>", "Membership tier: bronze, silver, or gold")
  .option("-q, --quantity <number>", "Number of members to add", "1")
  .action(async (name: string, tier: string, options: { quantity: string }) => {
    if (name.trim() === "") {
      throw new Error("Member name cannot be empty.")
    }

    if (!isMembershipTier(tier)) {
      throw new Error("Invalid tier. Choose bronze, silver, or gold.")
    }

    const quantity = Number(options.quantity)

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Quantity must be a positive whole number.")
    }

    for (let i = 0; i < quantity; i++) {
      const memberName =
        quantity === 1 ? name.trim() : `${name.trim()} ${i + 1}`

      const member = await createMember({
        name: memberName,
        tier,
      })

      console.log(
        `Created ${member.name} (${member.tier}) with ID ${member.id}.`,
      )
    }

    console.log(`Successfully added ${quantity} member(s).`)
  })

program
  .command("count")
  .description("Show the number of members in a membership tier")
  .argument("[tier]", "Membership tier to count")
  .action(async (tierArgument?: string) => {
    let tier: MembershipTier

    if (tierArgument === undefined) {
      const answer = await inquirer.prompt([
        {
          type: "select",
          name: "tier",
          message: "Which membership tier do you want to count?",
          choices: ["bronze", "silver", "gold"],
        },
      ])

      tier = answer.tier as MembershipTier
    } else {
      if (!isMembershipTier(tierArgument)) {
        throw new Error("Invalid tier. Choose bronze, silver, or gold.")
      }

      tier = tierArgument
    }

    const members = await getMembers()
    const count = members.filter((member) => member.tier === tier).length

    console.log(`Total ${tier} members: ${count}`)
  })

program
  .command("list")
  .description("Display all shop members")
  .action(async () => {
    const members = await getMembers()

    if (members.length === 0) {
      console.log("There are no members yet.")
      return
    }

    console.table(members)
  })

export async function runCli(): Promise<void> {
  try {
    await program.parseAsync(process.argv)
  } catch (error) {
    if (error instanceof Error && error.name === "ExitPromptError") {
      return
    }

    if (error instanceof CommanderError) {
      process.exitCode = error.exitCode
      return
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred."

    console.error(message)
    process.exitCode = 1
  }
}
