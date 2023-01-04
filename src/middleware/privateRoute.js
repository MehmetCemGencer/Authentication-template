/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function privateRoute(req, res, next) {
	if (req.isAuthenticated()) {
		req.uid = req.user.id
		return next()
	}

	return res.status(401).json({ message: "Not authenticated" })
}
