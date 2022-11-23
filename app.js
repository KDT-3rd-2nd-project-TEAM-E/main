const express = require("express");
const app = express();
const PORT = 8000;
const axios = require("axios");
const cors = require("cors");
//crawler
const cheerio = require("cheerio");

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// var client_id = "urNGDSfBuXXLnlOxYK9B";
// var client_secret = "FlW5KvYsgW";

// const indexRouter = require("./routes");
// app.use("/", indexRouter);

// app.get("/", (req, res) => {
//   res.render("index");
// });

// intro
app.get("/", (req, res) => {
  res.render("index");
});

// main
app.get("/main", (req, res) => {
  res.render("main", {activeMenu : "main"});
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

// sub
app.get("/sub1", (req, res) => {
  res.render("sub1", { activeMenu: "sub1" });
});

app.get("/sub2", (req, res) => {
  res.render("sub2", { activeMenu: "sub2" });
});

app.get("/sub3", (req, res) => {
  res.render("sub3", { activeMenu: "sub3" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/main", async (req, res) => {
  // console.log(req.body.search);
  let result = await main(req.body.search);
  console.log("aa >>> ", result);
  res.render("main");
});

//Crawler
async function main(search) {
  // ❶ HTML 로드하기
  try {
    const resp = await axios.get(
      `https://www.myfitnesspal.com/ko/nutrition-facts-calories/${encodeURI(
        search
      )}`
    );
    const $ = cheerio.load(resp.data); // ❷ HTML을 파싱하고 DOM 생성하기
    const titleArray = $(".css-qumjp8"); // ❸ CSS 셀렉터로 원하는 요소 찾기
    const kcalArray = $(".css-w1kjmb");

    const brandAmountArray = $(".css-j7qwjs > .css-w1kjmb");

    // const brandAmountArray = $(".smallText greyText greyLink");
    // const amountArray = $(".css-w1kjmb");
    // ➍ 찾은 요소를 순회하면서 요소가 가진 텍스트를 출력하기
    titleArray.each((idx, el) => {
      return $(el).text();
    });
    brandAmountArray.each((idx, el) => {
      return $(el).text();
    });
    kcalArray.each((idx, el) => {
      return $(el).text();
    });

    const foods = [];

    for (let i = 0; i < titleArray.length; i++) {
      let title = titleArray[i].children[0].data;

      let kcalText = kcalArray.text();
      kcalRegex = kcalText.match(/칼로리\s:\s\d{1,3}탄수화물+./g);
      kcal = String(kcalRegex[i]).replace(/[^0-9]/g, "");

      let brand = brandAmountArray[i].children[0].data;
      let amount =
        brandAmountArray[i].children[2].data +
        brandAmountArray[i].children[6].data;

      let carbsRegex = kcalText.match(/탄수화물:\s\d{1,3}g+./g);
      carbs = String(carbsRegex[i]).replace(/[^0-9]/g, "");

      let fatRegex = kcalText.match(/지방\s:\s\d{1,3}g+./g);
      fat = String(fatRegex[i]).replace(/[^0-9]/g, "");

      let protienRegex = kcalText.match(/단백질\s:\s\d{1,3}./g);
      protien = String(protienRegex[i]).replace(/[^0-9]/g, "");

      let array = { title, brand, kcal, amount, carbs, fat, protien };

      // console.log(">>>", brandAmountArray[i].children[0].data);
      foods.push(array);
    }

    return foods;
  } catch (err) {
    console.log(err);
  }
}

app.get("*", (req, res) => {
  res.render("404");
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
