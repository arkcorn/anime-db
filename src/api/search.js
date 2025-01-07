require("dotenv").config();

const express = require("express");
const router = express.Router();

const pg = require("pg");
const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

router.get("/search", async (req, res) => {
  let { term, page } = req.query;
  page = page ? page : 0;
  console.log("Search anime", term, page);

  const perPage = 50;

  let whereClause = "";
  const params = [page * perPage];
  if (term) {
    whereClause = `WHERE CONCAT(title, synonyms) ILIKE $2`;
    params.push(`%${term}%`);
  }

  let { rows } = await pool.query(
    `   SELECT
            *
        FROM
            anime
        ${whereClause}
        ORDER BY title
        OFFSET $1 LIMIT ${perPage}`,
    params
  );

  res.json({ rows }).end();
});

module.exports = router;
