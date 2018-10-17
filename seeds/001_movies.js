exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function() {
      // Inserts seed entries
      return knex('movies').insert([{
            id: 1,
            title: 'blah blah',
            director: 'russ',
            year: 1990,
            rating: 0
          },
          {
            id: 2,
            title: 'stinkfloyd',
            director: 'nick',
            year: 2015,
            rating: 5
          },
          {
            id: 3,
            title: 'thebestmovie',
            director: 'russ',
            year: 2017,
            rating: 10
          },
          {
            id: 4,
            title: 'The Avengers',
            director: 'Joss Wheden',
            year: 2012,
            rating: 10
          }
        ])
        .then(function() {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies))")
        })
    })
}
