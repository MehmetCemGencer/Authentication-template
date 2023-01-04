import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { sequelize } from "../../database/postgresql.js"
import { createTables } from "../../database/models/index.js"
import {
	createUser,
	deleteUser,
	getUserByEmail,
	getUserByEmailWithPassword,
	getUserById,
	getUserByIdWithPassword,
} from "../../database/repository/index.js"

chai.use(chaiAsPromised)
let expect = chai.expect

describe("Repository Tests", function () {
	describe("User Repository", function () {
		let userId

		beforeAll(async function () {
			// Establish database connection
			await sequelize.authenticate()
			// Update or create table
			await createTables()
		})

		it("should create new user", async function () {
			const user = await createUser("username", "e@mail.com", "password")

			expect(user).to.be.an("object")
			expect(user.username).to.be.a("string")
			expect(user.username).to.be.equal("username")
			userId = user.id
		})

		it("should not create new user with same email", async function () {
			await expect(
				createUser("different", "e@mail.com", "password")
			).to.be.rejectedWith(Error)
		})

		it("should get user by email", async function () {
			const user = await getUserByEmail("e@mail.com")

			expect(user).to.be.an("object")
			expect(user.email).to.be.equal("e@mail.com")
			expect(user).to.not.have.property("password")
		})

		it("should get user by email with password", async function () {
			const user = await getUserByEmailWithPassword("e@mail.com")

			expect(user).to.be.an("object")
			expect(user.email).to.be.equal("e@mail.com")
			expect(user).to.have.property("password")
		})

		it("should get user by id", async function () {
			const user = await getUserById(userId)

			expect(user).to.be.an("object")
			expect(user).to.not.have.property("password")
		})

		it("should get user by id with password", async function () {
			const user = await getUserByIdWithPassword(userId)

			expect(user).to.be.an("object")
			expect(user.id).to.equal(userId)
			expect(user).to.have.property("password")
		})

		it("should delete user", async function () {
			const isDeleted = await deleteUser(userId)

			expect(isDeleted).to.be.true
		})

		afterAll(async function () {
			// Delete table
			await sequelize.query("Drop Table users;")
			// Close database connection
			await sequelize.close()
		})
	})
})
