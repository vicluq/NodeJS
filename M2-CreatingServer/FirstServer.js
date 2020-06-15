const http = require("http");

//TODO: First Step: create an instance of createServer
const server = http.createServer((req, res) => {
  // Executes the received function for every incoming req -> GET, POST,etc
  console.log("New Request: ", req.url, req.method);
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>First server with HTTP</h1>", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("written to document");
    }
  });
  res.end(() => {
    console.log("response sent!");
  });
});

//FIXME: set res headers -> give something to render -> end resp

//TODO: after creating the server we have to listen to requests
// must give the port
server.listen(3003, () => {
  console.log("Server on => port 3003");
});
