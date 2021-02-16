const dotenv = require("dotenv");
const env = dotenv.config();
if (env.error) throw new Error(".env 없음");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const config = {
  db: dbConfig,
  dbSchema: process.env.DB_SCHEMA,
  prefix: process.env.ROUTE_PREFIX,
  port: process.env.PORT,
  hostname: process.env.HOST,
};

module.exports = config;
