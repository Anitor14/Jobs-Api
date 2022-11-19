const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

// we are using the mongoose middleware pre
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10); // generating a random byte.
  this.password = await bcrypt.hash(this.password, salt); // hashing the password takes in the password and the generated salt.
  // goes to the next middleware function.
});

// we are creating the jwt using the mongoose instance methods.

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name }, // this is the payload which constitutes of the userID and the username.
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

//using the mongoose instance methods to create a function to compare the password from the req.body and this.password.
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);
