const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const logEvents = require("./logEvents");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

//when we deploy
const port = process.env.PORT || 3500;
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));
const serveFile = async (filePath, contentType, resposnse) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf-8" : ""
    );
    const data =
      contentType == "application/json" ? JSON.parse(rawData) : rawData;
    resposnse.writeHead(filePath.includes("404.html") ? 400 : 200, {
      "Content-Type": contentType,
    });
    resposnse.end(
      contentType == "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    myEmitter.emit("log", `${err.name}\t${err.message}`, "errLog.txt");
    //because it is a server error
    resposnse.statusCode = 500;
    resposnse.end();
  }
};

const server = http.createServer((req, res) => {
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
  const extention = path.extname(req.url);
  let contentType = "text/html";
  switch (extention) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
  }
  //filepath using ternary statements
  let filePath =
    contentType == "text/html" && req.url == "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType == "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType == "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);
  console.log(filePath);

  //making html extension not required in the browser
  if (!extention && req.url.slice(-1) !== "/") filePath += ".html";

  if (fs.existsSync(filePath)) {
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), contentType, res);
    }
  }
});
server.listen(port, () => console.log(`Server running on port ${port}`));
