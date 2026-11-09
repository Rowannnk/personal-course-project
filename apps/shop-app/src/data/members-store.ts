import { readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { isMembers, type Member } from "@shop/loyalty-core/loyalty"

const currentFolder = dirname(fileURLToPath(import.meta.url))

const membersFile = join(currentFolder, "members.json")

export async function readMembers(): Promise<Member[]> {
  let fileContent: string

  try {
    fileContent = await readFile(membersFile, "utf-8")
  } catch (error) {
    throw new Error("Could not read the members data file.", {
      cause: error,
    })
  }

  let data: unknown

  try {
    data = JSON.parse(fileContent)
  } catch {
    throw new Error("The members data file contains invalid JSON.")
  }

  if (!isMembers(data)) {
    throw new Error("The members data file contains invalid member data.")
  }

  return data
}

export async function saveMembers(members: Member[]): Promise<void> {
  try {
    await writeFile(membersFile, JSON.stringify(members, null, 2), "utf-8")
  } catch (error) {
    throw new Error("Could not save the members data.", {
      cause: error,
    })
  }
}
