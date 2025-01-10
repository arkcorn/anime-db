require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const pg = require("pg");
const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPass = await bcrypt.hash(password, 10);

  // const time = Date.now() // TODO

  const response = await pool.query(
    ` INSERT INTO userInfo (
    email, password 
  ) VALUES (
   $1, $2)
    `,
    [email, hashedPass]
  );

  res.json({ message: "User may or may not be created" }); // TODO
});

module.exports = router;
