import type { CreateMemberInput, Member } from "@shop/loyalty-core/loyalty"

type ApiError = {
  message: string
}

const DEFAULT_SERVER_URL = "http://127.0.0.1:3000"

function isApiError(data: unknown): data is ApiError {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  )
}

function isMember(data: unknown): data is Member {
  if (typeof data !== "object" || data === null) {
    return false
  }

  if (!("id" in data) || !("name" in data) || !("tier" in data)) {
    return false
  }

  return (
    typeof data.id === "string" &&
    data.id.trim() !== "" &&
    typeof data.name === "string" &&
    data.name.trim() !== "" &&
    (data.tier === "bronze" || data.tier === "silver" || data.tier === "gold")
  )
}

function isMembers(data: unknown): data is Member[] {
  return Array.isArray(data) && data.every(isMember)
}

async function request(
  path: string,
  options: RequestInit = {},
  serverUrl = DEFAULT_SERVER_URL,
): Promise<unknown> {
  let response: Response

  try {
    response = await fetch(`${serverUrl}${path}`, options)
  } catch {
    throw new Error(
      "Could not reach the Shop Loyalty server. Make sure the API is running.",
    )
  }

  let data: unknown

  try {
    data = await response.json()
  } catch {
    throw new Error("The server returned an invalid JSON response.")
  }

  if (!response.ok) {
    throw new Error(
      isApiError(data) ? data.message : "The server request failed.",
    )
  }

  return data
}

export async function getMembers(serverUrl?: string): Promise<Member[]> {
  const data = await request("/members", {}, serverUrl)

  if (!isMembers(data)) {
    throw new Error("The server returned invalid member data.")
  }

  return data
}

export async function createMember(
  member: CreateMemberInput,
  serverUrl?: string,
): Promise<Member> {
  const data = await request(
    "/members",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    },
    serverUrl,
  )

  if (!isMember(data)) {
    throw new Error("The server returned invalid member data.")
  }

  return data
}

export async function getMemberById(
  id: string,
  serverUrl?: string,
): Promise<Member> {
  const data = await request(
    `/members/${encodeURIComponent(id)}`,
    {},
    serverUrl,
  )

  if (!isMember(data)) {
    throw new Error("The server returned invalid member data.")
  }

  return data
}
