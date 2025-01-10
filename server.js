require("dotenv").config();

const express = require("express");
const app = express();
const pgRouter = require("./src/api/pg");
const perplexityRouter = require("./src/api/perplexity");
const userRouter = require("./src/api/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", pgRouter);
app.use("/api", perplexityRouter);
app.use("/api", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
