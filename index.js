import cors from "cors"
import express from "express"
import session from "./src/security/session.js"
import route from "./src/routes/index.js"
import { errorHandler } from "./src/middleware/errorHandler.js"
import { startServer } from "./src/startServer.js"

export const app = express()

// Middlewares
app.use(express.json({ extended: false }))
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
)
session(app)

// Routes
app.use("/", route)
app.use(errorHandler)

await startServer(app)
