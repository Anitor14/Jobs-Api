const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // check if the header is present or it startsWith "bearer".
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1]; // split at the space and take the second value which is the token.

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // verification of the token
    // attach the user to the job routes.
    // const user = User.findById(payload.id).select("-password");
    // req.user = user;
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
