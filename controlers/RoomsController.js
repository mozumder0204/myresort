const { connect, mongoType } = require("../database/db");
const { Resort } = require("../models/resort");
const { Rooms } = require("../models/rooms");
const apiResponse = require("../helpers/response");
const moment = require("moment");
var fs = require("fs");

exports.roomCreate = async (req, res) => {
  try {
    await connect();

    if (req.body.roomList.length) {
      for (let i = 0; i < req.body.roomList.length; i++) {
        const bot = req.body.roomList[i];

        let imageName = "resort_" + mongoType().ObjectId();
        imgPath = `http://${req.get(
          "host"
        )}/files/resortImages/${imageName}.jpg`;

        let checkResortExist = await Resort.find({
          _id: mongoType().ObjectId(bot.resortId),
        }).count();
        if (checkResortExist === 0) {
          return apiResponse.ErrorResponse(
            res,
            `Resort Not Found! - ${bot.roomName}`
          );
        }

        let rooms = new Rooms({
          resortId: bot.resortId,
          roomName: bot.roomName,
          description: bot.description,
          price: bot.price,
          isVatIncluded: bot.isVatIncluded,
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
              bot.imagePath,
              "base64"
            );
          }
        });
        console.log(i);
      }
    } else {
      return apiResponse.ErrorResponse(res, `No Rooms Found~`);
    }

    return apiResponse.successResponse(res, "Success");
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
