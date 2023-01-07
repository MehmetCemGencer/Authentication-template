import { readFileSync } from "fs"

export const SESSION_SECRET = setVarAccordingToEnv(
	"../run/secrets/session_secret",
	"secret"
)
export const DB_URL = setVarAccordingToMultipleEnv(
	"../run/secrets/db_url",
	"localhost",
	"auth-db"
)
export const DB_PORT = parseInt(
	setVarAccordingToEnv("../run/secrets/db_port", 5432)
)
export const DB_USERNAME = setVarAccordingToEnv(
	"../run/secrets/db_username",
	"postgres"
)
export const DB_PASSWORD = setVarAccordingToEnv(
	"../run/secrets/db_password",
	"postgres"
)
export const DB_NAME = setVarAccordingToEnv("../run/secrets/db_name", "auth")
export const REDIS_URL = setVarAccordingToMultipleEnv(
	"../run/secrets/redis_url",
	"localhost",
	"redis"
)
export const REDIS_PORT = parseInt(
	setVarAccordingToEnv("../run/secrets/redis_port", 6379)
)

/**
 * @param {string} path File path
 * @param {string | number} alternative Value to be used if file does not exists
 * @return {string | number}
 */
function setVarAccordingToEnv(path, alternative) {
	return process.env.NODE_ENV == "production"
		? readFileSync(path, "utf-8")
		: alternative
}

/**
 * @param {string} path File path
 * @param {string | number} fAlternative First alternative to be used if file does not exists
 * @param {string | number} sAlternative Second alternative to be used if file does not exists
 * @return {string | number}
 */
function setVarAccordingToMultipleEnv(path, fAlternative, sAlternative) {
	return process.env.NODE_ENV == "production"
		? readFileSync(path, "utf-8")
		: process.env.NODE_ENV == "ghtest"
		? fAlternative
		: sAlternative
}
