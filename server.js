const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("config");
const cors = require("cors");

// var bodyParser = require("bod");

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log(`MongoDB connected...`);
  })
  .catch((error) => {
    console.log(error);
  });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://vishal-assesment-test.netlify.app/", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

var allowedOrigins = [
  config.get("frontend_url.production"),
  "https://frontend-dev-techsierra.netlify.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      for (var i = 0; i < allowedOrigins.length; i++) {
        var allowedOrigin = allowedOrigins[i];

        // if origin matches an allowed origin, allow the request
        if (typeof allowedOrigin === "string" && allowedOrigin == origin) {
          return callback(null, true);
        } else if (
          allowedOrigin instanceof RegExp &&
          allowedOrigin.test(origin)
        ) {
          return callback(null, true);
        }
      }

      // if origin is not allowed
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Hello server is running").end();
});

app.use(express.json());
app.use("/api/users", require("./api/users"));
app.use("/api/test-details", require("./api/testDetails"));

app.listen(port, () => {
  console.log(`Server started and listening onn port: ${port}`);
});
