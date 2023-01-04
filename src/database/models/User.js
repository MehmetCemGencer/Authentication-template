import { sequelize } from "../postgresql.js"
import Sequelize from "sequelize"
const DataTypes = Sequelize

export const UserModel = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "users",
	}
)
