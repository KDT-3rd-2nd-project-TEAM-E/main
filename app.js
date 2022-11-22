const express = require("express");
const app = express();
const PORT = 8000;
const axios = require("axios");
//crawler
exports.cors = require("cors");
const cheerio = require("cheerio");

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.render("main", { activeMenu: "main" });
});

app.get("/sub1", (req, res) => {
  res.render("sub1", { activeMenu: "sub1" });
});

app.get("/sub2", (req, res) => {
  res.render("sub2", { activeMenu: "sub2" });
});

app.get("/sub3", (req, res) => {
  res.render("sub3", { activeMenu: "sub3" });
});

app.get("/sub4", (req, res) => {
  res.render("sub4", { activeMenu: "sub4" });
  //커밋
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// app.get("*", (req, res) => {
//   res.render("404");
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
