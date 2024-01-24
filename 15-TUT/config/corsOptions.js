const whiteList = [
  "https://www.google.com",
  "https://127/0.0.1.5500",
  "http://localhost:3500",
  "http://localhost:5173",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
