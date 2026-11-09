type MembershipTier = "bronze" | "silver" | "gold"

type Member = {
  id: string
  name: string
  tier: MembershipTier
}

type CreateMemberInput = Pick<Member, "name" | "tier">

type ApiError = {
  message: string
}

const SERVER_URL = "http://127.0.0.1:3000"
const API_KEY = "shop-secret-key"

function isApiError(data: unknown): data is ApiError {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  )
}

async function request<T extends object = Record<string, unknown>>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${SERVER_URL}${path}`, options)
  } catch {
    throw new Error("Could not reach the Shop Loyalty server.")
  }

  let data: T | ApiError

  try {
    data = (await response.json()) as T | ApiError
  } catch {
    throw new Error("The server returned an invalid JSON response.")
  }

  if (!response.ok) {
    throw new Error(
      isApiError(data) ? data.message : "The server request failed.",
    )
  }

  return data as T
}

export async function getMembers(): Promise<Member[]> {
  return request<Member[]>("/members", {
    headers: {
      "x-shop-api-key": API_KEY,
    },
  })
}

export async function createMember(member: CreateMemberInput): Promise<Member> {
  return request<Member>("/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  })
}

export async function getMemberById(id: string): Promise<Member> {
  return request<Member>(`/members/${id}`)
}
