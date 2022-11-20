const express = require("express");
const app = express();
const PORT = 8000;

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
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("buhee");
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

// app.get('*', (req, res) => {
//   res.render('404')
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
