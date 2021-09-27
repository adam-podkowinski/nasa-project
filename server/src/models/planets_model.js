const parse = require("csv-parse");
const fs = require("fs");
const path = require("path");

const habitablePlanets = [];

const isHabitablePlanet = (planet) =>
  planet["koi_disposition"] === "CONFIRMED" &&
  planet["koi_insol"] > 0.36 &&
  planet["koi_insol"] < 1.11 &&
  planet["koi_prad"] < 1.6;

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    );

    readStream
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", (data) => {
        if (isHabitablePlanet(data)) habitablePlanets.push(data);
      })
      .on("error", (error) => {
        console.log(`ERROR: ${error}`);
        reject(error);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found`);
        resolve();
      });
  });
};

const getAllPlanets = () => {
  return habitablePlanets;
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
