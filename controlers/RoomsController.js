const { connect, mongoType } = require("../database/db");
const { Resort } = require("../models/resort");
const { Rooms } = require("../models/rooms");
const apiResponse = require("../helpers/response");
const moment = require("moment");
var fs = require("fs");

exports.roomCreate = async (req, res) => {
  try {
    await connect();
    let imageName = "resort_" + Date.now();
    imgPath = `http://${req.get("host")}/files/resortImages/${imageName}.jpg`;

    let checkResortExist = await Resort.find({
      _id: mongoType().ObjectId(req.body.resortId),
    }).count();
    if (checkResortExist === 0) {
      return apiResponse.ErrorResponse(res, "Resort Not Found!");
    }

    let rooms = new Rooms({
      resortId: req.body.resortId,
      roomName: req.body.roomName,
      description: req.body.description,
      price: req.body.price,
      isVatIncluded: req.body.isVatIncluded,
      imagePath: imgPath,
      createdAt: new Date(),
      createdBy: `Admin`,
      isDisabled: false,
    });

    await rooms.save(function (err, doc) {
      if (err) {
        return apiResponse.ErrorResponse(res, err);
      }
      if (doc) {
        fs.writeFileSync(
          "./files/resortImages/" + imageName + ".jpg",
          req.body.imagePath,
          "base64"
        );
      }
    });
    return apiResponse.successResponseWithData(res, "Success", rooms);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};

exports.roomList = async (req, res) => {
  try {
    await connect();
    let data = await Rooms.find({
      resortId: req.params.resortId,
      isDisabled: false,
    });
    return apiResponse.successResponseWithData(res, "", data);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};

exports.roomDetails = async (req, res) => {
  try {
    await connect();
    let data = await Rooms.find({
      resortId: req.params.resortId,
      _id: mongoType().ObjectId(req.params.roomId),
      isDisabled: false,
    });
    return apiResponse.successResponseWithData(
      res,
      "",
      data.length ? data[0] : {}
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};
