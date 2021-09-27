const { getAllLaunches } = require("../../models/launches_model");
const { addNewLaunch } = require("../../models/launches_model");

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  const newLaunch = req.body;

  newLaunch.launchDate = new Date(newLaunch.launchDate);

  addNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
