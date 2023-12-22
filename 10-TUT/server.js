const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//middlewares

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//custom middleware logger(will be used everwhere as a middleware)
app.use(logger);

//to parse form data in the url
app.use(express.urlencoded({ extended: false }));

//middleware for json
app.use(express.json());

//middleware to serve the static files
app.use('/',express.static(path.join(__dirname, "/public")));
app.use('/subdir',express.static(path.join(__dirname, "/public")));

//routes
app.use("/subdir", require("./routes/subdir"));
app.use('/',require('./routes/root'));
app.use('/employees',require('./routes/api/employees'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));

//route handling

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
