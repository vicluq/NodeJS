const express = require("express");

const app = express();

const port = 3003;

const htmlForm = `
<form action='http://localhost:3003/new-product' method="POST">
    <h2>Add a New Product</h2>
    <input type="text" name='product_name' placeholder="name..." />
    <input type="text" name='price' placeholder="price..." />
    <button type="submit">SUBMIT</button>
</form>
`;

const products = [];
function createProductsList(products) {
  let list = "";
  products.forEach((prod) => {
    list += `<li>
        <p>${prod.product_name}</p>
        <p>${prod.price}</p>
    </li>`;
  });

  return `<ul>${list}</ul>`;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/new-product", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(202).send(htmlForm);
});

app.post("/new-product", (req, res, next) => {
  products.push(req.body);
  console.log(products);
  res.status(203).redirect("http://" + req.hostname + ":" + port + "/products");
});

app.use("/products", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  return res.status(202).send(createProductsList(products));
});

app.listen(port, () => {
  console.log("listening...");
});
