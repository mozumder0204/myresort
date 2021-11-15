const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const roomsSchema = new mongoose.Schema(
  {
    resortId: {
      type: String,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isVatIncluded: {
      type: Boolean,
      required: true,
    },
    imagePath: {
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

roomsSchema.plugin(uniqueValidator);
const Rooms = mongoose.model("room", roomsSchema);

module.exports.Rooms = Rooms;
