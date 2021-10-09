const http = require("http");

const app = require("./app");

const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets_model");
const { loadLaunchData } = require("./models/launches_model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on http://127.0.0.1:${PORT}`);
  });
};

startServer().catch((e) => {
  console.log(`Error: ${e}`);
});
