const express = require("express");

const planetsRouter = require("../routes/planets/planets_router");
const launchesRouter = require("../routes/launches/launches_router");

const api = express.Router();

api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;
