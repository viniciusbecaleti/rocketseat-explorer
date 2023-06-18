const knex = require("../database/knex")

class TagsController {
  async index(req, res) {
    const { user_id } = req.params

    const tags = await knex.select("*")
      .from("tags")
      .where({ user_id })

    return res.json(tags)
  }
}

module.exports = TagsController