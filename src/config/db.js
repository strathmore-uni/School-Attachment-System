const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "attachment_db",
  password: "Bdan@112233",
  port: 5432,
});

module.exports = pool;