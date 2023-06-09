require("express-async-errors")
const express = require("express")
const routes = require("./routes")
const AppError = require("./utils/AppError")
const migrationsRun = require("./database/sqlite/migrations")

const app = express()
migrationsRun()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.log(error)

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

const port = 3000
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))