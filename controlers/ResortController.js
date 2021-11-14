const { connect } = require("../database/db");
const { Resort } = require("../models/resort");
const apiResponse = require("../helpers/response");
const moment = require("moment");

exports.createResort = async (req, res) => {
  try {
    await connect();



    return apiResponse.successResponseWithData(res, "Success", data);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err.message);
  }
};
