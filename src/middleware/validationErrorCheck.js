import { validationResult } from "express-validator"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function validationErrorCheck(req, res, next) {
	const errors = validationResult(req)

	if (errors.isEmpty()) return next()

	return res.status(400).json({
		errors: errors.errors.map((e) => {
			return { [e.param]: e.msg }
		}),
	})
}
