const express = require("express");
const path = require("path");

/*  Route for Adding New Products to Data Base  */
const new_product = express.Router();

new_product.get("/new-product", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res
    .status(202)
    .sendFile(
      path.resolve(process.mainModule.path + "/views/new_product.html")
    );
});

new_product.post("/new-product", (req, res) => {
  console.log(req.body);
  res.status(203).redirect("http://" + req.hostname + ":3003" + "/products");
});

module.exports = new_product;
