exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function() {
      // Inserts seed entries
      return knex('movies').insert([{
            id: 1,
            title: 'WALL-E',
            director: 'Andrew Stanton',
            year: 2008,
            rating: 4
          },
          {
            id: 2,
            title: 'The Lord of the Rings: The Return of the King',
            director: 'Peter Jackson',
            year: 2003,
            rating: 5
          },
          {
            id: 3,
            title: 'Saving Private Ryan',
            director: 'Steven Spielberg',
            year: 1998,
            rating: 5
          },
          {
            id: 4,
            title: 'Whiplash',
            director: 'Damien Chazelle',
            year: 2014,
            rating: 5
          },
          {
            id: 5,
            title: 'Up',
            director: 'Bob Peterson & Pete Doctor',
            year: 2009,
            rating: 5
          },
          {
            id: 6,
            title: 'Aladdin',
            director: 'John Musker & Ron Clements',
            year: 1992,
            rating: 5
          },
          {
            id: 7,
            title: 'Raiders of the Lost Ark',
            director: 'Steven Spielberg',
            year: 1981,
            rating: 4
          },
          {
            id: 8,
            title: 'Office Space',
            director: 'Mike Judge',
            year: 1999,
            rating: 5
          },
          {
            id: 9,
            title: 'The Goonies',
            director: 'Richard Donner',
            year: 1985,
            rating: 5
          },
          {
            id: 10,
            title: 'Amélie',
            director: 'Jean-Pierre Jeunet',
            year: 2001,
            rating: 5
          }
        ])
        .then(function() {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies))")
        })
    })
}
