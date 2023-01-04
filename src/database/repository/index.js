import { User } from "../models/index.js"

export async function getUserById(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findByPk(id, {
				attributes: ["id", "username", "email"],
			})

			if (user) return resolve(user.dataValues)

			return resolve(null)
		} catch (e) {
			return reject(e)
		}
	})
}

export async function getUserByIdWithPassword(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findByPk(id)

			if (user) return resolve(user.dataValues)

			return resolve(null)
		} catch (e) {
			return reject(e)
		}
	})
}

export async function getUserByEmail(email) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findOne({
				where: { email },
				attributes: ["id", "email", "username"],
			})

			if (user) return resolve(user.dataValues)

			return resolve(null)
		} catch (e) {
			return reject(e)
		}
	})
}

export async function getUserByEmailWithPassword(email) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findOne({
				where: { email },
			})

			if (user) return resolve(user.dataValues)

			return resolve(null)
		} catch (e) {
			return reject(e)
		}
	})
}

export async function createUser(username, email, password) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.create({ username, email, password })

			return resolve(user.dataValues)
		} catch (e) {
			return reject(e)
		}
	})
}

export async function deleteUser(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findByPk(id)

			if (!user) return resolve(false)

			await user.destroy()

			return resolve(true)
		} catch (e) {
			return reject(e)
		}
	})
}
