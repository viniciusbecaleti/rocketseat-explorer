const { Router } = require("express")
const NotesController = require("../controllers/NotesController")

const notesRoutes = Router()
const notesController = new NotesController()

notesRoutes.get("/", notesController.index)
notesRoutes.post("/:user_id", notesController.create)
notesRoutes.get("/:note_id", notesController.show)
notesRoutes.delete("/:note_id", notesController.delete)

module.exports = notesRoutes