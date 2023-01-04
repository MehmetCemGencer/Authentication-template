import bcrypt from "bcryptjs"
import {
	createUser,
	getUserByEmail,
	getUserByIdWithPassword,
	deleteUser,
} from "../database/repository/index.js"

/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @return {{error: string | null, data: {user: {id: string, username: string, email: string}} | null}}
 */
export async function registerUser(username, email, password) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await getUserByEmail(email)

			if (user)
				return resolve({
					error: "User already exists",
					data: null,
				})

			const salt = await bcrypt.genSalt(9)
			const hash = await bcrypt.hash(password, salt)

			const newUser = await createUser(username, email, hash)

			return resolve({
				error: null,
				data: {
					user: {
						id: newUser.id,
						username,
						email,
					},
				},
			})
		} catch (e) {
			reject(e)
		}
	})
}

/**
 * @param {string} id
 * @param {string} password
 * @return {string | null}
 */
export async function comparePasswordAndDeleteUser(id, password) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await getUserByIdWithPassword(id)

			if (!user) return resolve("User not found")

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) return resolve("Password does not match")

			await deleteUser(id)

			resolve(null)
		} catch (e) {
			reject(e.message)
		}
	})
}
