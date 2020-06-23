const express = require("express");
const path = require("path");

const users = express.Router();

users.get("/users", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  return res
    .status(200)
    .sendFile(path.resolve(__dirname + "/../views/users.html"));
});

module.exports = users;
