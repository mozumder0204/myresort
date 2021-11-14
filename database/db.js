const mongoose = require("mongoose");

module.exports = {
  connect: () => connect(),
  mongoType: () => mongoose.Types,
  startSession: () => startSession(),
  endSession: () => endSession(),
  close: () => close(),
};

async function connect() {
  const atlasUri =
    "mongodb+srv://admin:admin@resortdb.uealg.mongodb.net/myresort?retryWrites=true&w=majority";

  if (mongoose.connection.readyState === 0) {
    return await mongoose.connect(atlasUri, {
      useNewUrlParser: true,
      keepAlive: false,
    });
  } else return true;
}

async function startSession() {
  return await mongoose.startSession();
}

async function close() {
  await mongoose.close();
}
