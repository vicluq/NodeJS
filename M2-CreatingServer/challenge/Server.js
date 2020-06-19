const http = require("http");

const RoutesHandler = require("./Routes");

const server = http.createServer((req, res) => {
  RoutesHandler(req, res);
});

server.listen(3000, () => {
  console.log("Server On || PORT: 3000");
});
