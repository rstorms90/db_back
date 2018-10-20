exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('title', 255).notNullable().defaultTo('')
    table.string('director', 255).notNullable().defaultTo('')
    table.integer('year', 255).notNullable().defaultTo(0)
    table.integer('rating', 255).notNullable().defaultTo(0)
    table.timestamps(true, true)
    table.string('photo').notNullable()
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movies')
}
