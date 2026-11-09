import Fastify from "fastify"
import fastifyStatic from "@fastify/static"
import { fileURLToPath } from "node:url"

import memberRoutes from "./plugins/members.js"

const app = Fastify({
  logger: true,
})

const publicDirectory = fileURLToPath(new URL("../../public/", import.meta.url))

app.register(fastifyStatic, {
  root: publicDirectory,
  prefix: "/",
})

app.get("/", async (_request, reply) => {
  return reply.sendFile("index.html")
})

app.register(memberRoutes)

const start = async (): Promise<void> => {
  try {
    await app.listen({
      port: 3000,
      host: "127.0.0.1",
    })

    console.log("Shop Loyalty API is running at http://127.0.0.1:3000")
    console.log("Dashboard: http://127.0.0.1:3000")
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

await start()
