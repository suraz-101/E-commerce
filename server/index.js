require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/route");
const apiVersion = "/api/v1";

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use(express.static("public"));

mongoose.connect(process.env.DB).then(() => {
  console.log("database connected successfully");
});

app.use(`${apiVersion}`, router);

app.use((err, req, res, next) => {
  err = err ? err.toString() : "something went wrong";
  res.status(500).json({ message: err });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(
    `The server is running at port http://localhost:${process.env.PORT}`
  );
});
