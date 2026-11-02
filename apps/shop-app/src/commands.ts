import { Command, CommanderError } from "commander"
import inquirer from "inquirer"
import { writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import {
  isMembershipTier,
  type MembershipTier,
} from "@shop/loyalty-core/loyalty"

import { loadMembers } from "./data/load-members.js"

const currentFolder = dirname(fileURLToPath(import.meta.url))

const membersFile = join(currentFolder, "data", "members.json")

const program = new Command()

program
  .name("shop-loyalty")
  .description("A command-line tool for managing shop memberships")
  .showHelpAfterError()

program.exitOverride()

program
  .command("add")
  .description("Add members to a membership tier")
  .argument("<tier>", "Membership tier: bronze, silver, or gold")
  .option("-q, --quantity <number>", "Number of members to add", "1")
  .action(async (tier: string, options: { quantity: string }) => {
    if (!isMembershipTier(tier)) {
      throw new Error("Invalid tier. Choose bronze, silver, or gold.")
    }

    const quantity = Number(options.quantity)

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Quantity must be a positive whole number.")
    }

    const members = await loadMembers()

    for (let i = 0; i < quantity; i++) {
      members.push(tier)
    }

    await writeFile(membersFile, JSON.stringify(members, null, 2), "utf-8")

    console.log(`Successfully added ${quantity} ${tier} member(s).`)
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

    const members = await loadMembers()

    const count = members.filter((member) => member === tier).length

    console.log(`Total ${tier} Members: ${count}`)
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
