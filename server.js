require("dotenv").config();

const express = require("express");
const app = express();
const pgRouter = require("./src/api/pg");
const perplexityRouter = require("./src/api/perplexity");

app.use("/api", pgRouter);
app.use("/api", perplexityRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
