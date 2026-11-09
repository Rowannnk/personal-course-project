import type { FastifyInstance } from "fastify"

type MembershipTier = "bronze" | "silver" | "gold"

type Member = {
  id: string
  name: string
  tier: MembershipTier
}

const members: Member[] = [
  { id: "1", name: "John", tier: "bronze" },
  { id: "2", name: "Sarah", tier: "silver" },
  { id: "3", name: "David", tier: "gold" },
]

let nextMemberId = 4

const API_KEY = "shop-secret-key"

export default async function memberRoutes(
  app: FastifyInstance,
): Promise<void> {
  app.get<{ Params: { id: string } }>(
    "/members/:id",
    async (request, reply) => {
      const member = members.find((item) => item.id === request.params.id)

      if (!member) {
        return reply.code(404).send({
          message: "Sorry, this member does not exist.",
        })
      }

      return reply.code(200).send(member)
    },
  )

  app.post<{ Body: unknown }>("/members", async (request, reply) => {
    const body = request.body

    if (
      typeof body !== "object" ||
      body === null ||
      !("name" in body) ||
      !("tier" in body) ||
      typeof body.name !== "string" ||
      body.name.trim() === "" ||
      (body.tier !== "bronze" && body.tier !== "silver" && body.tier !== "gold")
    ) {
      return reply.code(400).send({
        message: "Invalid member data. Provide a name and valid tier.",
      })
    }

    const newMember: Member = {
      id: String(nextMemberId++),
      name: body.name.trim(),
      tier: body.tier,
    }

    members.push(newMember)

    return reply.code(201).send(newMember)
  })

  app.get("/members", async (request, reply) => {
    const apiKey = request.headers["x-shop-api-key"]

    if (apiKey !== API_KEY) {
      return reply.code(401).send({
        message: "Unauthorized. Missing or invalid API key.",
      })
    }

    return reply.code(200).send(members)
  })
}
