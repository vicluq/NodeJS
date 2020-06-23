const express = require("express");
const path = require("path");

const home = express.Router();

home.get("/home", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  return res
    .status(200)
    .sendFile(path.resolve(__dirname + "/../views/home.html"));
});

module.exports = home;
