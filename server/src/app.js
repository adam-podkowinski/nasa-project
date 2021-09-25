const express = require("express");
const cors = require("cors");
const path = require("path");

const planetsRouter = require("./routes/planets/planets_router");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(planetsRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
