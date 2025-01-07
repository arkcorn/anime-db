require("dotenv").config();

const express = require("express");
const router = express.Router();

const pg = require("pg");
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
  ssl: process.env.DATABASE_URL
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

router.get("/search", async (req, res) => {
  let { term, page } = req.query;
  page = page ? page : 0;
  console.log("Search anime", term, page);

  let whereClause = "";
  const params = [page * 10];
  if (term) {
    whereClause = `WHERE title ILIKE $2`;
    params.push(`%${term}%`);
  }

  let { rows } = await pool.query(
    `   SELECT
            *
        FROM
            anime
        ${whereClause}
        OFFSET $1 LIMIT 10`,
    params
  );

  res.json({ rows }).end();
});

module.exports = router;
