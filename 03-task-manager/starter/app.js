require("./db/connect");
const express = require("express");
const app = express();

//Requiring our all the routes.
const tasks = require("./routes/tasks");

const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

PORT = process.env.PORT || 5000;

const start = async (url) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`this server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
