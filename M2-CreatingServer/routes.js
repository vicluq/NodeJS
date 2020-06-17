const fs = require("fs");
const { Buffer } = require("buffer");

exports.requestHandler = function (req, res) {
  if (req.method === "POST" && req.url === "/") {
    const bodyChunks = [];

    req.on("data", (chunk) => {
      bodyChunks.push(chunk);
    });

    return req.on("end", () => {
      const bodyData = parseStringBody(bodyChunks);
      //append to file
      fs.appendFile(
        "./files/names.txt",
        `Name: ${bodyData.name},Lastname: ${bodyData.lastname}\n`,
        (err) => {
          if (err) {
            return res
              .writeHead(500, { Location: `http://${req.headers.host}/` })
              .end();
          } else {
            // start response
            res.writeHead(301, {
              Location: `http://${req.headers.host}/`,
            });

            return res.end();
          }
        }
      );
    });
  }

  // GET Req
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write("<h1>Send Us Your Your Name</h1>", (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.write(
      "<form action='http://localhost:3003/' method='POST'><label>Name:</label><input type='text' name='name' required minlength=4 /><br><label>Lastname:</label><input type='text' name='lastname' required minlength=4 /><button>Submit Name</button></form>",
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    return res.end();
  }

  // default for not configured paths
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 404;
  res.write("<h1>Not Cofigured Path</h1>", (err) => {
    if (err) {
      console.log(err);
    }
  });

  return res.end();
};

function parseStringBody(chunks) {
  const bodyData = {};

  const parsedChunks = Buffer.concat(chunks).toString();
  const bodyQuery = new URLSearchParams(parsedChunks);

  // create the parsed body obj
  for (element of bodyQuery.entries()) {
    bodyData[element[0]] = element[1];
  }

  return bodyData;
}
