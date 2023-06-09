const sqliteConnection = require("../")
const createUsers = require("./createUsers")

async function migrationsRun() {
  const schemas = [
    createUsers,
  ].join("")

  try {
    const database = await sqliteConnection()
    database.exec(schemas)
  } catch (error) {
    console.log(error)
  }
}

module.exports = migrationsRun