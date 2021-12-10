const { connect, mongoType } = require("../database/db");
const { Admin } = require("../models/admin");
const apiResponse = require("../helpers/response");
const moment = require("moment");

exports.adminCreate = async (req, res) => {
  try {
    await connect();
    let admin = new Admin({
      fullName: req.body.fullName,
      cellNo: req.body.cellNo,
      email: req.body.email,
      category: req.body.category,
      password: req.body.password,
      createdAt: new Date(),
      createdBy: `Admin`,
      isDisabled: false,
    });
    await admin.save();
    return apiResponse.successResponseWithData(res, "Success", admin);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};

exports.adminList = async (req, res) => {
    try {
      await connect();
      let data = await Admin.find({ isDisabled: false });
      return apiResponse.successResponseWithData(res, "", data);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  };

exports.adminSignin = async (req, res) => {
  try {
    await connect();
    let data = await Admin.find({
      cellNo: req.body.cellNo,
      password: req.body.password,
      isDisabled: false,
    });
    if (data.length) {
      return apiResponse.successResponseWithData(res, "Authorized", {
        isAuthenticated: true,
        userInformation: {
          adminId: data[0]._id,
          fullName: data[0].fullName,
          cellNo: data[0].cellNo,
          email: data[0].email,
          category: data[0].category,
        },
      });
    } else {
      return apiResponse.successResponseWithData(res, "Unauthorized", {
        isAuthenticated: false,
        userInformation: {},
      });
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};
