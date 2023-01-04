import { UserModel } from "./User.js"

export async function createTables() {
	try {
		await UserModel.sync({ alter: true })
	} catch (e) {
		throw Error(e.message)
	}
}

export { UserModel as User }
