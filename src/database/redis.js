import { createClient } from "redis"
import { REDIS_PORT, REDIS_URL } from "../config/index.js"

export const redisClient = createClient({
	legacyMode: true,
	socket: {
		host: REDIS_URL,
		port: REDIS_PORT,
	},
})
