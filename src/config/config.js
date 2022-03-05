

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  dbSchema: process.env.DB_SCHEMA || 'sch_comm',
  authURL: process.env.AUTH_URL || 'http://localhost:3002'
}

module.exports = { config };