const { connect, mongoType } = require("../database/db");
const { Resort } = require("../models/resort");
const apiResponse = require("../helpers/response");
const moment = require("moment");

exports.resortCreate = async (req, res) => {
  try {
    await connect();
    let resort = new Resort({
      resortName: req.body.resortName,
      address: req.body.address,
      cellNo: req.body.cellNo,
      email: req.body.email,
      isWifiExist: req.body.isWifiExist,
      isBreakfastExist: req.body.isBreakfastExist,
      isParkingExist: req.body.isParkingExist,
      isOutdoorPoolExist: req.body.isOutdoorPoolExist,
      isLaundryExist: req.body.isLaundryExist,
      isBBQExist: req.body.isBBQExist,
      createdAt: new Date(),
      createdBy: `Admin`,
      isDisabled: false,
    });
    await resort.save();
    return apiResponse.successResponseWithData(res, "Success", resort);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};

exports.resortList = async (req, res) => {
  try {
    await connect();
    let data = await Resort.find({ isDisabled: false });
    return apiResponse.successResponseWithData(res, "", data);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};

exports.resortAutoComplete = async (req, res) => {
  try {
    await connect();
    const regexp = new RegExp(`^.*${req.body.item}.*`, "gmi");
    let data = await Resort.aggregate([
      {
        $match: {
          resortName: regexp,
          isDisabled: false,
        },
      },
    ]);
    return apiResponse.successResponseWithData(res, "", data);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};

exports.resortDetails = async (req, res) => {
  try {
    await connect();
    let data = await Resort.find({
      _id: mongoType().ObjectId(req.params.resortId),
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

exports.resortDelete = async (req, res) => {
  try {
    await connect();
    let deleteResort = await Resort.updateOne(
      {
        _id: mongoType().ObjectId(req.params.resortId),
        isDisabled: false,
      },
      {
        $set: {
          isDisabled: true,
        },
      }
    );

    if (deleteResort.n === 0) {
      return apiResponse.ErrorResponse(res, `Resort Not Found`);
    }
    if (deleteResort.nModified === 0) {
      return apiResponse.ErrorResponse(res, `Resort Not Deleted`);
    }
    return apiResponse.successResponse(res, "Resort Deleted");
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};

exports.resortUpdate = async (req, res) => {
  try {
    await connect();
    let deleteResort = await Resort.updateOne(
      {
        _id: mongoType().ObjectId(req.params.resortId),
        isDisabled: false,
      },
      {
        $set: {
          ...req.body,
        },
      }
    );

    if (deleteResort.n === 0) {
      return apiResponse.ErrorResponse(res, `Resort Not Found`);
    }
    if (deleteResort.nModified === 0) {
      return apiResponse.ErrorResponse(res, `Resort Not Updated`);
    }
    return apiResponse.successResponse(res, "Resort Updated");
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};
