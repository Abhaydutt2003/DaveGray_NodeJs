const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//middlewares

//Cross Origin Resource Sharing
const whiteList = [
  "https://www.google.com",
  "https://127/0.0.1.5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) != -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//custom middleware logger(will be used everwhere as a middleware)
app.use(logger);

//to parse form data in the url
app.use(express.urlencoded({ extended: false }));

//middleware for json
app.use(express.json());

//middleware to serve the static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  //res.sendFile('./views/index.html',{root:__dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by defualt
});

//route handling

const one = (req, res, next) => {
  console.log("Hell0 1");
  next();
};
const two = (req, res, next) => {
  console.log("Hell0 2");
  next();
};
const three = (req, res) => {
  console.log("Hell0 3");
};

app.get("/chain(.html)?", [one, two, three]);


app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
