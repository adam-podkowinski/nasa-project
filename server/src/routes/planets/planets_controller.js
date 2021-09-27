const { getAllPlanets } = require("../../models/planets_model");

const httpGetAllPlanets = (req, res) => {
  return res.status(200).json(getAllPlanets());
};

module.exports = {
  httpGetAllPlanets,
};
