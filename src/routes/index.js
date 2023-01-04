import express from "express"
import { body } from "express-validator"
import { privateRoute } from "../middleware/privateRoute.js"
import { validationErrorCheck } from "../middleware/validationErrorCheck.js"
import {
	authenticateController,
	deleteUserController,
	loginController,
	logoutController,
	registerController,
} from "../controllers/index.js"

const router = express.Router()

const loginMiddlewares = [
	body("email")
		.exists()
		.withMessage('"email" field must exists')
		.isEmail()
		.withMessage("Please enter a valid email address"),
	body("password")
		.exists()
		.withMessage('"password" field must exists')
		.isLength({ min: 6 })
		.withMessage("Password must be longer than 6 characters"),
	validationErrorCheck,
]

const registerMiddlewares = [
	body("username")
		.exists()
		.withMessage('"username" field must exists')
		.isLength({ min: 4 })
		.withMessage("Username must be longer than 4 characters"),
	body("email")
		.exists()
		.withMessage('"email" field must exists')
		.isEmail()
		.withMessage("Please enter a valid email address"),
	body("password")
		.exists()
		.withMessage('"password" field must exists')
		.isLength({ min: 6 })
		.withMessage("Password must be longer than 6 characters"),
	body("confirmPassword")
		.exists()
		.withMessage('"confirmPassword" field must exists')
		.custom((value, { req }) => value === req.body.password)
		.withMessage("Passwords does not match"),
	validationErrorCheck,
]

const deleteMiddlewares = [
	privateRoute,
	body("password")
		.exists()
		.withMessage('"password" field must exists')
		.isLength({ min: 6 })
		.withMessage("Password must be longer than 6 characters"),
	validationErrorCheck,
]

/**
 * @module routes/auth
 */

/**
 * Authenticate user
 *
 * @private
 * @name GET /
 * @function
 */
router.get("/", privateRoute, authenticateController)
/**
 * Logout user
 *
 * @private
 * @name GET /logout
 * @function
 */
router.get("/logout", privateRoute, logoutController)
/**
 * Login
 *
 * @name POST /
 * @function
 * @param {string} email
 * @param {string} password
 */
router.post("/", loginMiddlewares, loginController)
/**
 * Delete user
 *
 * @private
 * @name POST /delete
 * @function
 * @param {string} password
 */
router.post("/delete", deleteMiddlewares, deleteUserController)
/**
 * Register a new user
 *
 * @name POST /register
 * @function
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} confirmPassword
 */
router.post("/register", registerMiddlewares, registerController)

export default router
