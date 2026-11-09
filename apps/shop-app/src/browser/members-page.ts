import { getMembers } from "../services/members.js"

import type { Member } from "@shop/loyalty-core/loyalty"

const membersListElement =
  document.querySelector<HTMLUListElement>("#members-list")

const memberDetailsElement =
  document.querySelector<HTMLElement>("#member-details")

const totalMembersElement =
  document.querySelector<HTMLElement>("#total-members")

const tierCountElement = document.querySelector<HTMLElement>("#tier-count")

const shopStatusElement = document.querySelector<HTMLElement>("#shop-status")

const memberCountElement = document.querySelector<HTMLElement>("#member-count")

if (!membersListElement || !memberDetailsElement) {
  throw new Error("Could not find the required page elements.")
}

const membersList = membersListElement
const memberDetails = memberDetailsElement

let members: Member[] = []

function showMessage(message: string): void {
  const messageElement = document.createElement("p")
  messageElement.textContent = message

  membersList.replaceChildren(messageElement)
}

function updateStatistics(): void {
  if (totalMembersElement) {
    totalMembersElement.textContent = String(members.length).padStart(2, "0")
  }

  if (tierCountElement) {
    const uniqueTiers = new Set(members.map((member) => member.tier))

    tierCountElement.textContent = String(uniqueTiers.size).padStart(2, "0")
  }

  if (shopStatusElement) {
    shopStatusElement.textContent = "Active"
  }

  if (memberCountElement) {
    memberCountElement.textContent = `${members.length} ${members.length === 1 ? "Member" : "Members"}`
  }
}

function renderMembers(): void {
  membersList.replaceChildren()

  if (members.length === 0) {
    showMessage("No members found. Add your first member using the CLI.")
    return
  }

  for (const member of members) {
    const listItem = document.createElement("li")
    listItem.dataset.memberId = member.id

    const memberInfo = document.createElement("div")

    const memberName = document.createElement("div")
    memberName.className = "member-name"
    memberName.textContent = member.name

    const memberTier = document.createElement("div")
    memberTier.className = "member-tier"
    memberTier.textContent = `${member.tier} membership`

    memberInfo.append(memberName, memberTier)
    listItem.append(memberInfo)

    membersList.append(listItem)
  }
}

function showMemberDetails(member: Member): void {
  const heading = document.createElement("h2")
  heading.textContent = "Member Details"

  const name = document.createElement("p")
  name.textContent = `Name: ${member.name}`

  const tier = document.createElement("p")
  tier.textContent = `Membership Tier: ${member.tier}`

  const id = document.createElement("p")
  id.textContent = `Member ID: ${member.id}`

  memberDetails.replaceChildren(heading, name, tier, id)
}

function handleMemberClick(event: MouseEvent): void {
  if (!(event.target instanceof Element)) {
    return
  }

  const listItem = event.target.closest("li")

  if (!listItem || !membersList.contains(listItem)) {
    return
  }

  const memberId = listItem.dataset.memberId

  const selectedMember = members.find((member) => member.id === memberId)

  if (!selectedMember) {
    return
  }

  showMemberDetails(selectedMember)
}

async function initializePage(): Promise<void> {
  showMessage("Loading members...")

  try {
    members = await getMembers()

    renderMembers()
    updateStatistics()

    memberDetails.textContent =
      "Select a member from the list to view their details."

    membersList.addEventListener("click", handleMemberClick)
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while loading members."

    showMessage(message)

    memberDetails.textContent = "Member details are unavailable right now."

    if (shopStatusElement) {
      shopStatusElement.textContent = "Unavailable"
    }
  }
}

void initializePage()

window.addEventListener(
  "pagehide",
  () => {
    membersList.removeEventListener("click", handleMemberClick)
  },
  { once: true },
)
