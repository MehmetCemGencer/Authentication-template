import { readFileSync } from "fs"

export const SESSION_SECRET =
	process.env.NODE_ENV == "production"
		? readFileSync("../run/secrets/session_secret", "utf-8")
		: "secret"
export const DB_URL =
	process.env.NODE_ENV == "production"
		? readFileSync("../run/secrets/db_url", "utf-8")
		: process.env.NODE_ENV == "test"
		? "localhost"
		: "auth-db"
export const DB_PORT =
	process.env.NODE_ENV == "production"
		? parseInt(readFileSync("../run/secrets/db_port", "utf-8"))
		: 5432
export const DB_USERNAME =
	process.env.NODE_ENV == "production"
		? readFileSync("../run/secrets/db_username", "utf-8")
		: "postgres"
export const DB_PASSWORD =
	process.env.NODE_ENV == "production"
		? readFileSync("../run/secrets/db_password", "utf-8")
		: "postgres"
export const DB_NAME =
	process.env.NODE_ENV == "production"
		? readFileSync("../run/secrets/db_name", "utf-8")
		: "auth"
export const REDIS_URL =
	process.env.NODE_ENV == "production"
		? readFileSync("../run/secrets/redis_url", "utf-8")
		: process.env.NODE_ENV == "test"
		? "localhost"
		: "redis"
export const REDIS_PORT =
	process.env.NODE_ENV == "production"
		? parseInt(readFileSync("../run/secrets/redis_port", "utf-8"))
		: 6379
