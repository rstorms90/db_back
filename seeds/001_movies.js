exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function() {
      // Inserts seed entries
      return knex('movies').insert([
        {id: 1, colname1: '', colname2: '', colname3: ''},
        {id: 2, colname1: '', colname2: '', colname3: ''},
        {id: 3, colname1: '', colname2: '', colname3: ''}
      ])
      .then(function() {
        // Moves id column (PK) auto-incrementer to correct value after inserts
        return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies))")
      })
    })
}
