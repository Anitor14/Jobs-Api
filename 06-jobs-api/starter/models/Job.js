const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"], // these are possible values
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", // we referencing the user here.
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
