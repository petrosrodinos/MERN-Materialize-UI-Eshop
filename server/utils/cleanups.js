var CronJob = require("cron").CronJob;
const User = require("../models/user");

exports.deleteUnverifiedUsers = () => {
  let job = new CronJob(
    "00 00 00 * * *",
    deleteUsers,
    null,
    true,
    "America/Los_Angeles"
  );

  job.start();
};

const deleteUsers = async () => {
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  try {
    console.log("deleting...");
    await User.deleteMany({
      createdAt: { $lt: cutoff },
      phoneVerified: false,
      emailVerified: false,
    });
  } catch (error) {
    console.log(error);
  }
};
