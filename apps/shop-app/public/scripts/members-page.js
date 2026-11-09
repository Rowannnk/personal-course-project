"use strict";
const members = [
    { id: "1", name: "John", tier: "bronze" },
    { id: "2", name: "Sarah", tier: "silver" },
    { id: "3", name: "David", tier: "gold" },
    { id: "4", name: "Emma", tier: "silver" },
];
const membersListElement = document.querySelector("#members-list");
const memberDetailsElement = document.querySelector("#member-details");
if (!membersListElement || !memberDetailsElement) {
    throw new Error("Could not find the required page elements.");
}
const membersList = membersListElement;
const memberDetails = memberDetailsElement;
for (const member of members) {
    const listItem = document.createElement("li");
    const memberInfo = document.createElement("div");
    const memberName = document.createElement("div");
    memberName.className = "member-name";
    memberName.textContent = member.name;
    const memberTier = document.createElement("div");
    memberTier.className = "member-tier";
    memberTier.textContent = `${member.tier} membership`;
    memberInfo.append(memberName, memberTier);
    listItem.append(memberInfo);
    listItem.dataset.memberId = member.id;
    membersList.append(listItem);
}
function handleMemberClick(event) {
    if (!(event.target instanceof Element)) {
        return;
    }
    const listItem = event.target.closest("li");
    if (!listItem || !membersList.contains(listItem)) {
        return;
    }
    const memberId = listItem.dataset.memberId;
    const selectedMember = members.find((member) => member.id === memberId);
    if (!selectedMember) {
        return;
    }
    const heading = document.createElement("h2");
    heading.textContent = "Member Details";
    const name = document.createElement("p");
    name.textContent = `Name: ${selectedMember.name}`;
    const tier = document.createElement("p");
    tier.textContent = `Membership Tier: ${selectedMember.tier}`;
    memberDetails.replaceChildren(heading, name, tier);
}
membersList.addEventListener("click", handleMemberClick);
window.addEventListener("pagehide", () => {
    membersList.removeEventListener("click", handleMemberClick);
}, { once: true });
