const { Buffer } = require("buffer");
const os = require("os");

const opSys = os.platform();
const { username } = os.userInfo();

const rootPage = `
<h1>Welcome to My Web Server</h1>
<h3> This Web Server is powered by HTTP Node Module </h3>
<p>Server being accessed on: ${
  opSys === "win32" ? "Windows" : "MacOS"
} by user ${username}</p>
<a href='/users'>Users</a>
<a href='/create-user'>Add New User</a>
`;

const formUsers = `
<form action='http://localhost:3000/create-user' method='POST'>
<input name='username' placeholder='username...' minlength=4/>
<button type='submit'>Submit User</button>
</form>
`;

const users = [];

function RoutesHandler(req, res) {
  if (req.url === "/" && req.method === "GET") {
    return RootRoute(req, res);
  }
  // 'users route'
  else if (req.url === "/users" && req.method === "GET") {
    return UsersRoute(req, res);
  }
  // GET to create-user
  else if (req.url === "/create-user" && req.method === "GET") {
    return CreateUsersGETRoute(req, res);
  }
  // POST to create-user
  else if (req.url === "/create-user" && req.method === "POST") {
    return CreateUsersPOSTRoute(req, res);
  }
  // '404 route'
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 Page Not Found</h1>");
    return res.end();
  }
}

// ----- Routes Handlers --------

function RootRoute(req, res) {
  console.log("New Request to Root Path ");
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  res.write(rootPage);
  return res.end();
}

function UsersRoute(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  if (users.length === 0) {
    res.write(rootPage);
    res.write("<hr><h4>No Users Have Registered yet</h4>");
    return res.end();
  } else {
    let userLi = "";
    users.forEach((user) => {
      userLi += `<li>${user}</li>`;
    });
    res.write(rootPage);
    res.write(`
      <hr><h4>User List</h4>
        <ul>${userLi}</ul>`);
    return res.end();
  }
}

function CreateUsersGETRoute(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(rootPage);
  res.write("<hr>" + formUsers);
  return res.end();
}

function CreateUsersPOSTRoute(req, res) {
  const chunks = []; //chunk arr

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  return req.on("end", () => {
    console.log(parseUserBody(chunks));
    users.push(parseUserBody(chunks));
    res.statusCode = 301;
    res.setHeader("Location", "http://localhost:3000/users");
    res.end();
  });
}

// ----- Not Route Related

function parseUserBody(chunkArr) {
  const bufferedData = Buffer.concat(chunkArr).toString(); //username=someName
  const dataQuery = new URLSearchParams(bufferedData);
  return dataQuery.get("username");
}

module.exports = RoutesHandler;
