const express = require("express");
const path = require("path");

/*  Route for displaying products from Data Base  */
const products_route = express.Router();

products_route.get("/products", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  return res
    .status(200)
    .sendFile(path.resolve(process.mainModule.path + "/views/shop.html"));
});

module.exports = products_route;
