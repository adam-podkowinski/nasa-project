const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, "../client/build")));

app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${PORT}`);
});
