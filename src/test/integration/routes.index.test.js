import chai, { expect } from "chai"
import chaiAsPromised from "chai-as-promised"
import { sequelize } from "../../database/postgresql.js"
import supertest from "supertest"
import { app } from "../../../index.js"

const agent = supertest.agent(app)
chai.use(chaiAsPromised)

describe("Integration Tests", function () {
	describe("User service", function () {
		it("should not create user with unacceptable variables", async function () {
			const res = await agent.post("/register").send({
				username: "123",
				email: "email.com",
				password: "12345",
				confirmPassword: "54321",
			})

			expect(res.status).to.be.equal(400)
			expect(res.body.errors).to.be.an("array")
			expect(res.body.errors).to.have.lengthOf(4)
			expect(res.body.errors).to.deep.include({
				username: "Username must be longer than 4 characters",
			})
			expect(res.body.errors).to.deep.include({
				email: "Please enter a valid email address",
			})
			expect(res.body.errors).to.deep.include({
				password: "Password must be longer than 6 characters",
			})
			expect(res.body.errors).to.deep.include({
				confirmPassword: "Passwords does not match",
			})
		})

		it("should create new user", async function () {
			const res = await agent.post("/register").send({
				username: "test",
				email: "e@mail.com",
				password: "password",
				confirmPassword: "password",
			})

			expect(res.status).to.be.equal(201)
			expect(res.body.message).to.be.equal("User created")
		})

		it("should not create new user with existed email", async function () {
			const res = await agent.post("/register").send({
				username: "different",
				email: "e@mail.com",
				password: "asdfasdf",
				confirmPassword: "asdfasdf",
			})

			expect(res.status).to.be.equal(400)
			expect(res.body.message).to.be.a("string")
			expect(res.body.message).to.be.equal("User already exists")
		})

		it("should not authenticate", async function () {
			const res = await agent.get("/")

			expect(res.status).not.to.be.equal(200)
			expect(res.status).to.be.equal(401)
		})

		it("should login", async function () {
			const res = await agent.post("/").send({
				email: "e@mail.com",
				password: "password",
			})

			expect(res.status).to.be.equal(200)
			expect(res.body.data).to.be.an("object")
		})

		it("should not login with unregistered email", async function () {
			const res = await agent.post("/").send({
				email: "a@mail.com",
				password: "password",
			})

			expect(res.status).to.be.equal(400)
			expect(res.body.message).to.be.equal("Invalid credentials")
		})

		it("should not login with wrong password", async function () {
			const res = await agent.post("/").send({
				email: "e@mail.com",
				password: "passwor1",
			})

			expect(res.status).to.be.equal(400)
			expect(res.body.message).to.be.equal("Invalid credentials")
		})

		it("should not login with unacceptable variables", async function () {
			const res = await agent.post("/").send({
				email: "email.com",
				password: "12345",
			})

			expect(res.status).to.be.equal(400)
			expect(res.body.errors).to.be.an("array")
			expect(res.body.errors).to.have.lengthOf(2)
			expect(res.body.errors).to.deep.include({
				email: "Please enter a valid email address",
			})
			expect(res.body.errors).to.deep.include({
				password: "Password must be longer than 6 characters",
			})
		})

		it("should authenticate", async function () {
			const res = await agent.get("/")

			expect(res.status).to.be.equal(200)
			expect(res.status).not.to.be.equal(401)
		})

		it("should logout", async function () {
			const res = await agent.get("/logout")

			expect(res.status).to.be.equal(200)
		})

		it("should not authenticate", async function () {
			const res = await agent.get("/")

			expect(res.status).to.be.equal(401)
			expect(res.body.message).to.be.equal("Not authenticated")
		})

		afterAll(async function () {
			// Delete table
			await sequelize.query("Drop Table users;")
			// Close database connection
			await sequelize.close()
		})
	})
})
