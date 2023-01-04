import { Sequelize } from "sequelize"
import {
	DB_NAME,
	DB_PASSWORD,
	DB_PORT,
	DB_URL,
	DB_USERNAME,
} from "../config/index.js"

export const sequelize = new Sequelize({
	dialect: "postgres",
	host: DB_URL,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	logging: false,
})
