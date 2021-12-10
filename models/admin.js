const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    cellNo: {
      type: String,
      required: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["superAdmin", "admin"],
      required: true,
    },
    password: {
      type: String,
      required: true,
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

adminSchema.plugin(uniqueValidator);
const Admin = mongoose.model("admin", adminSchema);

module.exports.Admin = Admin;
