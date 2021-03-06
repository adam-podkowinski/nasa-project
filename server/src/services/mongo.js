const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const pass = fs.readFileSync(path.join(__dirname, "../mongodb_pass.txt"));

const MONGO_URL = `mongodb+srv://nasa-api:${pass}@nasacluster.h8lxc.mongodb.net/nasa?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (e) => {
  console.error(e);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
