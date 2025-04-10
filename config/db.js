require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Datebase connection error:", err.stack);
  } else {
    console.log("Database connected successfully");
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
