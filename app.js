const express = require("express");
const app = express();
const PORT = 8000;

var axios = require("axios");
var client_id = "urNGDSfBuXXLnlOxYK9B";
var client_secret = "FlW5KvYsgW";

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const indexRouter = require("./routes");
// app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/testlogin", (req, res) => {
  res.render("testlogin");
});

app.get("/testsearch", (req, res) => {
  res.render("testsearch");
});

app.get("/testsearchkakao", (req, res) => {
  console.log(req.query.result);

  res.render("testsearchkakao");

  // if (req.query == `req.query.result`) {
  //   res.render("testsearchkakao");
  // } else {
  //   res.send("오류");
  // }
});

app.get("/sub1", (req, res) => {
  res.render("sub1");
});

app.get("/sub2", (req, res) => {
  res.render("sub2");
});

app.get("/sub3", (req, res) => {
  res.render("sub3");
});

app.get("/sub4", (req, res) => {
  res.render("sub4");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
