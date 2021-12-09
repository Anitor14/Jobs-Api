//Check Username, password in post(login) request.
//If exist create new JWT.
//Send back to front-end. what is the major  in this case we are

//Setup authentication so only request with JWT can access the dashboard.
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/");
const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose required validation.
  // Joi
  // check in the controller.
  //checking if their is a username and password present.
  if (!username || !password) {
    throw new BadRequestError("please provide email and password");
  }

  //Just for demo, normally provided by the database.
  const id = new Date().getDate();

  // Try to keep the payload small for better experience for user.
  // Just for demo, in production use long, complex and unguessable string values.
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // console.log(username, password);
  // res.send("Fake Login/Register/Signup Route");
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
