const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// const userRouter = require("./Routes/UserRoutes");
const blogRouter = require("./Routes/BlogRoutes");

const app = express();
app.use(express.json());
dotenv.config();
require("./DB/index");

const corsOptions = {
  origin: process.env.FRONT_END_URL,
  optionsSuccessStatus: 200
};

app.use(cors());

// app.use(userRouter);
app.use(blogRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("App started at", port);
});
