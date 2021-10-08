const launches = require('./launches_mongo');
const planets = require('./planets_mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-296 f',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

const existsLaunchWithId = async (launchId) => launches.findOne({ flightNumber: launchId });

const getLatestFlightNumber = async () => {
  const latestLaunch = await launches.findOne().sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

const getAllLaunches = async () => launches.find({}, { __v: 0, _id: 0 });

const saveLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planets found');
  }

  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true },
  );
};

saveLaunch(launch).catch((e) => console.error(e));

const scheduleNewLaunch = async (l) => {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(l, {
    success: true,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

const abortLaunchById = async (launchId) => {
  const aborted = await launches.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false },
  );
  return aborted;
  // return aborted.ok === 1 && aborted.nModified === 1;
};

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
