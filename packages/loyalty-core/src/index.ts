export type MembershipTier = "bronze" | "silver" | "gold"

export class LoyaltyTracker {
  private memberCounts: Record<MembershipTier, number> = {
    bronze: 0,
    silver: 0,
    gold: 0,
  }

  addMember(tier: MembershipTier): void {
    this.memberCounts[tier] += 1
  }

  getMemberCount(tier: MembershipTier): number {
    return this.memberCounts[tier]
  }

  showSummary(): void {
    console.log("Membership Summary")
    console.log("Bronze:", this.memberCounts.bronze)
    console.log("Silver:", this.memberCounts.silver)
    console.log("Gold:", this.memberCounts.gold)
  }
}
