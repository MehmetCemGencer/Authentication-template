import passport from "passport"
import passportLocal from "./passport.js"
import session from "express-session"
import RedisStore from "connect-redis"
import { redisClient } from "../database/redis.js"
import { SESSION_SECRET } from "../config/index.js"

export default function (app) {
	// Setup passport strategy
	passportLocal(passport)

	// Access express session
	const sessionStore = RedisStore(session)

	// Enable database connection to session store
	const myStore = new sessionStore({
		client: redisClient,
		expiration: 2592000000,
	})

	// Express Session
	app.use(
		session({
			secret: SESSION_SECRET,
			resave: true,
			saveUninitialized: false,
			store: myStore,
			unset: "destroy",
		})
	)

	// Enable passport
	app.use(passport.initialize())
	app.use(passport.session())
}
