import { asyncHandler } from "../middleware/asyncHandler.js"
import {
	comparePasswordAndDeleteUser,
	registerUser,
} from "../services/index.js"
import passport from "passport"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const registerController = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body

	const { error, data } = await registerUser(username, email, password)

	if (error) return res.status(400).json({ message: error })

	res.status(201).json({ message: "User created", data })
})

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const loginController = asyncHandler((req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return res.status(400).json({ message: err.message })

		if (!user) return res.status(400).json({ message: "User not found" })

		req.login(user, (err) => {
			if (err) throw new Error(err.message)

			res.json({
				data: {
					user: {
						id: req.user.id,
						email: req.user.email,
						username: req.user.username,
					},
				},
			})
		})
	})(req, res, next)
})

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const authenticateController = asyncHandler((req, res) => {
	res.json({
		message: "Authenticated",
		data: {
			user: req.user,
		},
	})
})

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const logoutController = asyncHandler((req, res) => {
	req.logout((err) => {
		if (err) return res.status(400).json({ message: err })
		req.session.destroy(() => {})

		res.json({ message: "Logged out" })
	})
})

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const deleteUserController = asyncHandler(async (req, res) => {
	const error = await comparePasswordAndDeleteUser(
		req.user.id,
		req.body.password
	)

	if (error) return res.status(400).json({ message: error })

	req.logout((err) => {
		if (err) return res.status(400).json({ message: err })

		req.session.destroy(() => {})

		res.status(200).json({ message: "User deleted" })
	})
})
