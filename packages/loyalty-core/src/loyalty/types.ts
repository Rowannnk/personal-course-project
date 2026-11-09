export type MembershipTier = "bronze" | "silver" | "gold"

export type Member = {
  id: string
  name: string
  tier: MembershipTier
}

export type CreateMemberInput = Pick<Member, "name" | "tier">
