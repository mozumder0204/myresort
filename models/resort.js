const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const resortSchema = new mongoose.Schema(
  {
    resortName: {
      type: String,
      required: true,
      uppercase: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
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
const Resort = mongoose.model("item-group", resortSchema);

module.exports.Resort = Resort;
