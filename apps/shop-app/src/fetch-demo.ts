import { createMember, getMemberById, getMembers } from "./services/members.js"

async function main(): Promise<void> {
  try {
    const members = await getMembers()
    console.log("Members from GET:", members)

    const newMember = await createMember({
      name: "Emma",
      tier: "silver",
    })
    console.log("Created member with POST:", newMember)

    try {
      await getMemberById("999")
    } catch (error) {
      if (error instanceof Error) {
        console.log("Expected server error:", error.message)
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }

    process.exitCode = 1
  }
}

await main()
