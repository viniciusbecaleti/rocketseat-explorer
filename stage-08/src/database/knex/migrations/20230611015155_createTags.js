exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id")
  table.text("name").notNullable()
  table.integer("user_id").notNullable().references("id").inTable("users")
  table.integer("note_id").notNullable().references("id").inTable("notes").onDelete("CASCADE")
})

exports.down = knex => knex.schema.dropTable("tags")