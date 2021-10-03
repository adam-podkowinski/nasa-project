const parse = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets_mongo");

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
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.log(`ERROR: ${error}`);
        reject(error);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found`);
        resolve();
      });
  });
};

const getAllPlanets = async () => {
  return planets.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
};

const savePlanet = async (planet) => {
  try {
    await planets.updateOne(
      { keplerName: planet["kepler_name"] },
      {
        keplerName: planet["kepler_name"],
      },
      { upsert: true }
    );
  } catch (e) {
    console.error(`Could not save a planet ${e}`);
  }
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
