const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const resortSchema = new mongoose.Schema(
  {
    resortName: {
      type: String,
      required: true,
      uppercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    cellNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isWifiExist: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBreakfastExist: {
      type: Boolean,
      required: true,
      default: false,
    },
    isParkingExist: {
      type: Boolean,
      required: true,
      default: false,
    },
    isOutdoorPoolExist: {
      type: Boolean,
      required: true,
      default: false,
    },
    isLaundryExist: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBBQExist: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updateInfo: {
      type: [
        {
          updatedAt: {
            type: Date,
          },
          updatedBy: {
            type: String,
          },
          remarks: {
            type: String,
          },
        },
      ],
      default: [],
    },
    isDisabled: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

resortSchema.plugin(uniqueValidator);
const Resort = mongoose.model("resort", resortSchema);

module.exports.Resort = Resort;
