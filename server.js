const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("config");
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://vishal-assesment-test.netlify.app/", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Hello server is running").end();
});

app.use(express.json());
app.use("/api/users", require("./api/users"));

app.listen(port, () => {
  console.log(`Server started and listening onn port: ${port}`);
});
