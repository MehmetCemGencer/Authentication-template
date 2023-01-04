import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { sequelize } from "../../database/postgresql.js"
import { createTables } from "../../database/models/index.js"
import {
	comparePasswordAndDeleteUser,
	registerUser,
} from "../../services/index.js"

chai.use(chaiAsPromised)
let expect = chai.expect

describe("Integration Tests", function () {
	describe("User service", function () {
		let userId

		beforeAll(async function () {
			// Establish database connection
			await sequelize.authenticate()
			// Update or create table
			await createTables()
		})

		it("should register new user", async function () {
			const { error, data } = await registerUser(
				"username",
				"e@mail.com",
				"password"
			)

			expect(error).to.be.null
			expect(data.user).to.be.an("object")
			expect(data.user.username).to.be.equal("username")
			expect(data.user.email).to.be.equal("e@mail.com")
			userId = data.user.id
		})

		it("should not register user with same email", async function () {
			const { error, data } = await registerUser(
				"username",
				"e@mail.com",
				"password"
			)

			expect(data).to.be.null
			expect(error).to.be.equal("User already exists")
		})

		it("should not delete user with wrong password", async function () {
			const isDeleted = await comparePasswordAndDeleteUser(
				userId,
				"random"
			)

			expect(isDeleted).to.be.a("string")
			expect(isDeleted).to.be.equal("Password does not match")
		})

		it("should delete user", async function () {
			const isDeleted = await comparePasswordAndDeleteUser(
				userId,
				"password"
			)

			expect(isDeleted).to.be.null
			expect(isDeleted).not.to.be.a("string")
		})

		afterAll(async function () {
			// Delete table
			await sequelize.query("Drop Table users;")
			// Close database connection
			await sequelize.close()
		})
	})
})
