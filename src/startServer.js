import waitPort from "wait-port"
import { sequelize } from "./database/postgresql.js"
import { redisClient } from "./database/redis.js"
import { createTables } from "./database/models/index.js"
import { DB_PORT, DB_URL, REDIS_PORT, REDIS_URL } from "./config/index.js"

export async function startServer(app) {
	const isRedisAvailable = await waitPort({
		port: REDIS_PORT,
		host: REDIS_URL,
	})

	const isPostgresAvailable = await waitPort({
		port: DB_PORT,
		host: DB_URL,
		interval: 2000,
	})

	if (isPostgresAvailable && isRedisAvailable) {
		await sequelize.authenticate()
		console.log("Postgresql connected")

		await redisClient.connect()
		console.log("Redis connected")

		await createTables()

		app.listen(8000, () => {
			console.log("Auth-service listening on port:8000")
		})
	}
}
