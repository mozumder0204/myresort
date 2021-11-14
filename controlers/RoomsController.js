const { connect, mongoType } = require("../database/db");
const { Resort } = require("../models/resort");
const { Rooms } = require("../models/rooms");
const apiResponse = require("../helpers/response");
const moment = require("moment");

exports.roomCreate = async (req, res) => {
  try {
    await connect();
    let rooms = new Rooms({
      roomName: req.body.roomName,
      createdAt: new Date(),
      createdBy: `Admin`,
      isDisabled: false,
    });
    await rooms.save();
    return apiResponse.successResponseWithData(res, "Success", rooms);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};
