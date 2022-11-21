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

const indexRouter = require("./routes");
app.use("/", indexRouter);

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
  res.render("testsearchkakao");
});

app.post("/search", async (req, res) => {
  query = req.body.query;
  // get query input

  var api_url =
    "https://openapi.naver.com/v1/search/blog?query=" + encodeURI(query);
  var options = {
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  }; // headers for get request
  await axios
    .get(api_url, options)
    .then((response) => {
      if (response.status === 200) {
        items = response.data.items;
        items.map((x) => {
          x.title = x.title.replace(/<b>/g, "");
          x.title = x.title.replace(/<\/b>/g, "");
          x.description = x.description.replace(/<b>/g, "");
          x.description = x.description.replace(/<\/b>/g, "");
        }); // remove html tags in query result

        res.render("result", { items: items });
      }
    })
    .catch((err) => {
      console.error(err);
    });
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
