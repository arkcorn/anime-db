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

const perPage = 10;

router.get("/animeData", async (req, res) => {
  const { title } = req.query;

  const { rows } = await pool.query(
    `
    SELECT * FROM anime WHERE title=$1
    `,
    [title]
  );
  res.json({ rows });
});

router.get("/getList", async (req, res) => {
  const { list, page } = req.query;

  console.log(list);

  const formattedList =
    "{" +
    list
      .split(",")
      .map((item) => `"${item}"`)
      .join(",") +
    "}";

  const { rows } = await pool.query(
    `SELECT * FROM anime WHERE title = ANY($2) OFFSET $1 LIMIT ${perPage}`,
    [page * perPage, formattedList]
  );
  res.json({ rows });
});

router.get("/search", async (req, res) => {
  let { term, page } = req.query;
  page = page ? page : 0;
  // console.log("Search anime", term, page);

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
        ORDER BY cardinality(tags) DESC, cardinality(synonyms) DESC, title
        OFFSET $1 LIMIT ${perPage}`,
    params
  );

  // console.log(rows);

  res.json({ rows }).end();
});

module.exports = router;
