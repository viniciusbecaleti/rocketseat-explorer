const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { compare } = require("bcrypt")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    if (!email) {
      throw new AppError("Email is required")
    }

    if (!password) {
      throw new AppError("Password is required")
    }

    const user = await knex("users").select("*").where({ email }).first()

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      throw new AppError("Password is incorrect", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return res.json({ user, token })
  }
}

module.exports = SessionsController