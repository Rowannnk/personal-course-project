import type { FastifyInstance } from "fastify"

import {
  isMembershipTier,
  type CreateMemberInput,
  type Member,
} from "@shop/loyalty-core/loyalty"

import { readMembers, saveMembers } from "../../data/members-store.js"

type ApiError = {
  message: string
}

export default async function memberRoutes(
  app: FastifyInstance,
): Promise<void> {
  app.get<{
    Reply: {
      200: Member[]
      500: ApiError
    }
  }>("/members", async (_request, reply) => {
    try {
      const members = await readMembers()

      return reply.code(200).send(members)
    } catch (error) {
      app.log.error(error)

      return reply.code(500).send({
        message: "Could not load members.",
      })
    }
  })

  app.get<{
    Params: { id: string }
    Reply: {
      200: Member
      404: ApiError
      500: ApiError
    }
  }>("/members/:id", async (request, reply) => {
    try {
      const members = await readMembers()

      const member = members.find((item) => item.id === request.params.id)

      if (!member) {
        return reply.code(404).send({
          message: "Sorry, this member does not exist.",
        })
      }

      return reply.code(200).send(member)
    } catch (error) {
      app.log.error(error)

      return reply.code(500).send({
        message: "Could not find the requested member.",
      })
    }
  })

  app.post<{
    Body: unknown
    Reply: {
      201: Member
      400: ApiError
      500: ApiError
    }
  }>("/members", async (request, reply) => {
    const body = request.body

    if (
      typeof body !== "object" ||
      body === null ||
      !("name" in body) ||
      !("tier" in body) ||
      typeof body.name !== "string" ||
      body.name.trim() === "" ||
      !isMembershipTier(body.tier)
    ) {
      return reply.code(400).send({
        message: "Invalid member data. Provide a name and valid tier.",
      })
    }

    const input: CreateMemberInput = {
      name: body.name.trim(),
      tier: body.tier,
    }

    try {
      const members = await readMembers()

      const nextId =
        members.reduce((highest, member) => {
          const numericId = Number(member.id)

          return Number.isInteger(numericId)
            ? Math.max(highest, numericId)
            : highest
        }, 0) + 1

      const newMember: Member = {
        id: String(nextId),
        ...input,
      }

      members.push(newMember)

      await saveMembers(members)

      return reply.code(201).send(newMember)
    } catch (error) {
      app.log.error(error)

      return reply.code(500).send({
        message: "Could not create the member.",
      })
    }
  })
}
