require("dotenv").config();

const express = require("express");
const app = express();
const searchRouter = require("./src/api/search");

app.use("/api", searchRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
