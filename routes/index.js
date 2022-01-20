const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const userRouter = require("./routes/user");
// const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const port = 8050;
mongoose.connect("mongodb://localhost:27017/musicdatabase");
app.use(express.json());
app.set("view engine", "ejs");

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
