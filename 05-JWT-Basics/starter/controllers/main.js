//Check Username, password in post(login) request.
//If exist create new JWT.
//Send back to front-end. what is the major  in this case we are

//Setup authentication so only request with JWT can access the dashboard.
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose required validation.
  // Joi
  // check in the controller.

  if (!username || !password) {
    throw new CustomAPIError("please provide email and password", 400);
  }

  const token = jwt.sign({});

  console.log(username, password);
  res.send("Fake Login/Register/Signup Route");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
