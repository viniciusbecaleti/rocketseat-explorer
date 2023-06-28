const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
  async update(req, res) {
    const { id: user_id } = req.user
    const { filename } = req.file

    const user = await knex("users").select("*").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found", 401)
    }

    const diskStorage = new DiskStorage()
    
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    await diskStorage.saveFile(filename)

    user.avatar = filename

    await knex("users").update(user).where({ id: user_id })

    return res.sendStatus(200)
  }
}

module.exports = UserAvatarController