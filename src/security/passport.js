import bcrypt from "bcryptjs"
import LocalStrategy from "passport-local"
import {
	getUserByEmailWithPassword,
	getUserById,
} from "../database/repository/index.js"

/**
 * @param {import("passport")} passport
 */
export default function (passport) {
	passport.use(
		new LocalStrategy.Strategy(
			{
				usernameField: "email",
			},
			async (email, password, done) => {
				try {
					const user = await getUserByEmailWithPassword(email)

					if (!user)
						return done(new Error("Invalid credentials"), false)

					const isMatch = await bcrypt.compare(
						password,
						user.password
					)

					if (!isMatch)
						return done(new Error("Invalid credentials"), false)

					done(null, {
						id: user.id,
						username: user.username,
						email: user.email,
					})
				} catch (e) {
					done(e, false)
				}
			}
		)
	)

	passport.serializeUser((user, done) => {
		done(null, user)
	})

	passport.deserializeUser(async (sUser, done) => {
		try {
			const user = await getUserById(sUser.id)

			if (user) {
				return done(null, user)
			}

			done(new Error("User Not Found"), false)
		} catch (e) {
			done(new Error(e.message), false)
		}
	})
}
