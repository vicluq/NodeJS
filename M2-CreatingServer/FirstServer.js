const http = require("http");

const { requestHandler } = require("./routes");

const server = http.createServer((req, res) => {
  requestHandler(req, res);
});

server.listen(3003, () => {
  console.log("Server On || PORT: 3003");
});
