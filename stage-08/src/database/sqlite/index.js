const { Database } = require("sqlite3")
const { open } = require("sqlite")
const path = require("node:path")

async function sqliteConnection() {
  const database = await open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: Database
  })

  return database
}

module.exports = sqliteConnection