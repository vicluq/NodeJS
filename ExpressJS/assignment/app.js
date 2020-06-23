const express = require("express");
const path = require("path");

const port = 3003;

const app = express();

app.use("/static", express.static(path.resolve(__dirname + "/public")));

app.use("/", require("./routes/users")); // route path will be attached to '/' by default --> '/users'
app.use("/", require("./routes/home"));

app.use("/", (req, res, next) => {
  //make sure it is '/' to redirect. If not, advance to 404 middleware
  if (req.path === "/") {
    res.status(301).redirect("/home");
  } else {
    next();
  }
});

app.use((req, res) => {
  res.status(404).send("<h1>PAGE NOT FOUND 404</h1>");
});

app.listen(port, () => {
  console.log("listening on: ", port);
});
