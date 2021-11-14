const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const roomsSchema = new mongoose.Schema(
  {
    roomName: {
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

roomsSchema.plugin(uniqueValidator);
const Rooms = mongoose.model("item-group", roomsSchema);

module.exports.Rooms = Rooms;
