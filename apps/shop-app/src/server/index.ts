import Fastify from "fastify"

import memberRoutes from "./plugins/members.js"

const app = Fastify({
  logger: true,
})

// Register the members plugin.
app.register(memberRoutes)

// Start the server.
const start = async (): Promise<void> => {
  try {
    await app.listen({
      port: 3000,
      host: "127.0.0.1",
    })

    console.log("Shop Loyalty API is running at http://127.0.0.1:3000")
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

await start()
