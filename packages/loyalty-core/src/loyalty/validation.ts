import type { Member, MembershipTier } from "./types.js"

function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isMembershipTier(value: unknown): value is MembershipTier {
  return isString(value) && ["bronze", "silver", "gold"].includes(value)
}

export function isMember(value: unknown): value is Member {
  if (typeof value !== "object" || value === null) {
    return false
  }

  if (!("id" in value) || !("name" in value) || !("tier" in value)) {
    return false
  }

  return (
    typeof value.id === "string" &&
    value.id.trim() !== "" &&
    typeof value.name === "string" &&
    value.name.trim() !== "" &&
    isMembershipTier(value.tier)
  )
}

export function isMembers(value: unknown): value is Member[] {
  return Array.isArray(value) && value.every(isMember)
}
