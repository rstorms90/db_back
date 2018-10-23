exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('title', 255).notNullable().defaultTo('')
    table.string('director', 255).notNullable().defaultTo('')
    table.integer('year', 255).notNullable().defaultTo(0)
    table.integer('rating', 255).notNullable().defaultTo(0)
    table.string('poster', 255).defaultTo('https://placekitten.com/200/300')
    table.timestamps(true, true)
    // OR
    // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movies')
}
