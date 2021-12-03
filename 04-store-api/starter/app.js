require("dotenv").config(); // getting our MONGO_URI from .env 
//async errors
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

//importing our Routers
const productsRouter = require("./routes/products");

//importing our middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send('<h1>store api</h1><a href="/api/v1/products">Product route</a>');
});

app.use("/api/v1/products", productsRouter);

// products routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
