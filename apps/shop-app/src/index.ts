import { LoyaltyTracker } from "@shop/loyalty-core"

const tracker = new LoyaltyTracker()

tracker.addMember("bronze")
tracker.addMember("silver")
tracker.addMember("gold")
tracker.addMember("gold")

tracker.showSummary()

console.log("Total Gold Members:", tracker.getMemberCount("gold"))
