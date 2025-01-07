const express = require("express");
const app = express();
const searchRouter = require("./src/api/search");

app.use("/api", searchRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
