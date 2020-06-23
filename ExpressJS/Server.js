const express = require("express");
const dotenv = require("dotenv");

const env_node = dotenv.config();

const app = express();

const port = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// serving my static files to use inside html
app.use("/css", express.static("./public/styles"));
app.use("/scripts", express.static("./public/scripts"));
app.use("/img", express.static("./public/images"));

app.get("/", (req, res, next) => {
  res.redirect(`${req.protocol}://${req.hostname}:${port}/products`);
});

// Routes --> ./Routes
app.use("/products", require("./Routes/NewProduct")); //FIXME it will see that there isn't a only '/products', but '/products/new-product' and will go to the next
app.use(require("./Routes/Shop"));

// 404 page --> if there is no middleware for the route before this, then it will fall in here
app.use((req, res) => {
  res.setHeader("Content-Type", "text/html");
  return res
    .status(404)
    .sendFile(process.mainModule.path + "/views/not_found.html");
});

app.listen(port, () => {
  console.log("listening...");
});
