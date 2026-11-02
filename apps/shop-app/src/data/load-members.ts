import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import {
  isMembershipTier,
  type MembershipTier,
} from "@shop/loyalty-core/loyalty"

const currentFolder = dirname(fileURLToPath(import.meta.url))

export async function loadMembers(): Promise<MembershipTier[]> {
  const filePath = join(currentFolder, "members.json")

  let fileContent: string

  try {
    fileContent = await readFile(filePath, "utf-8")
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      throw new Error("Members file is missing.", { cause: error })
    }

    throw new Error("Could not read the members file.", {
      cause: error,
    })
  }

  let data: unknown

  try {
    data = JSON.parse(fileContent)
  } catch {
    throw new Error("Members file contains invalid JSON.")
  }

  if (!Array.isArray(data) || !data.every(isMembershipTier)) {
    throw new Error(
      "Members file has an invalid shape. Expected an array of membership tiers.",
    )
  }

  return data
}
