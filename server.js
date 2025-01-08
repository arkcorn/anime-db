require("dotenv").config();

const express = require("express");
const app = express();
const searchRouter = require("./src/api/search");
const perplexityRouter = require("./src/api/perplexity");

app.use("/api", searchRouter);
app.use("/api", perplexityRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
