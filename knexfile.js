module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/movies'
  },
  test: {},
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
