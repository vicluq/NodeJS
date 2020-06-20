const http = require("http");

const { requestHandler } = require("./routes");

const server = http.createServer((req, res) => {
  requestHandler(req, res);
});

server.listen(3003, () => {
  console.log("Server On || PORT: 3003");
});

/*
FIXME: ADDING FILES
to send file, we have to add a content-type telling what kind it is or the general one. 
Also, we have to add the content-disposition to attachment and a filename 
TODO: ytdl pipe response with the content type and disposition
 */
