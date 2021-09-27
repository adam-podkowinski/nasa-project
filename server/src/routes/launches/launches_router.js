const express = require("express");

const { httpGetAllLaunches } = require("./launches_controller");
const { httpAddNewLaunch } = require("./launches_controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = launchesRouter;
