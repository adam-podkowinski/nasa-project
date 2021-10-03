const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets_model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:XxswouQ0HjifXI2L@nasacluster.h8lxc.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (e) => {
  console.error(e);
});

const startServer = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on http://127.0.0.1:${PORT}`);
  });
};

startServer().catch((e) => {
  console.log(`Error: ${e}`);
});
