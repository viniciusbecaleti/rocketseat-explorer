const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class NotesController {
  async create(req, res) {
    const { user_id } = req.params
    const { title, description, tags, links } = req.body

    const [ note_id ] = await knex("notes").insert({
      title,
      description,
      user_id,
    })

    const linksInsert = links.map(link => {
      return {
        url: link,
        note_id
      }
    })

    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(tag => {
      return {
        name: tag,
        user_id,
        note_id
      }
    })

    await knex("tags").insert(tagsInsert)

    res.sendStatus(201)
  }

  async show(req, res) {
    const { note_id } = req.params

    const note = await knex.select("*").from("notes").where({ id: note_id }).first()

    if (!note) {
      throw new AppError("Note not found")
    }

    res.json(note)
  }

  async delete(req, res) {
    const { note_id } = req.params

    const note = await knex.select("*").from("notes").where({ id: note_id }).first()

    if (!note) {
      throw new AppError("Note not found")
    }

    await knex("notes").where({ id: note_id }).del()

    res.sendStatus(200)
  }

  async index(req, res) {
    const { user_id, title, tags } = req.query

    let notes = []

    if (tags) {
      const filteredTags = tags.split(",")

      notes = await knex.select("notes.*")
        .from("tags")
        .where("notes.user_id", user_id)
        .whereLike("title", `%${title}%`)
        .whereIn("name", filteredTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title")
    } else {
      notes = await knex.select("*")
        .from("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
    }

    const userTags = await knex.select("*")
      .from("tags")
      .where({ user_id })

    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    const singleNotes = []

    notesWithTags.forEach(note => {
      const noteAlreadyExists = singleNotes.find(singleNote => singleNote.id === note.id)

      if (!noteAlreadyExists) {
        singleNotes.push(note)
      }
    })

    res.json(singleNotes)
  }
}

module.exports = NotesController