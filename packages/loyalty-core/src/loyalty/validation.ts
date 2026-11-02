import type { MembershipTier } from "./types.js"

function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isMembershipTier(value: unknown): value is MembershipTier {
  return isString(value) && ["bronze", "silver", "gold"].includes(value)
}
