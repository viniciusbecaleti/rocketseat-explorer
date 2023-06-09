const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const { hash, compare } = require("bcrypt")

class UsersController {
  /**
   * index - GET para listar vários registros
   * show - GET para exibir um registro específico
   * create - POST para criar um registro
   * update - PUT para atualizar um registro
   * delete - DELETE para excluir um registro
   */

  async create(req, res) {
    const { name, email, password } = req.body

    const database = await sqliteConnection()
    const userAlreadyExists = await database.get("SELECT * FROM users WHERE email = ?", [email])

    if (userAlreadyExists) {
      throw new AppError("User already exists")
    }

    const hashedPassword = await hash(password, 10)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return res.sendStatus(201)
  }

  async update(req, res) {
    const { id } = req.params
    const { name, email, newPassword, oldPassword } = req.body

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = ?", [id])

    if (!user) {
      throw new AppError("User not found")
    }

    const userByNewEmail = await database.get("SELECT * FROM users WHERE email = ?", [email])

    if (userByNewEmail && userByNewEmail.id !== user.id) {
      throw new AppError("Email already exists")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (newPassword && !oldPassword) {
      throw new AppError("The old password needs to be entered")
    }

    if (newPassword && oldPassword) {
      const isOldPasswordCorrect = await compare(oldPassword, user.password)

      if (!isOldPasswordCorrect) {
        throw new AppError("Old password is incorrect")
      }

      user.password = await hash(newPassword, 10)
    }

    await database.run(`
      UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
      WHERE
        id = ?
    `, [user.name, user.email, user.password, id])

    return res.sendStatus(200)
  }
}

module.exports = UsersController