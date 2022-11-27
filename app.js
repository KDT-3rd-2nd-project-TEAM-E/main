const express = require("express");
const app = express();
const PORT = 8000;
const axios = require("axios");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//crawler
const cheerio = require("cheerio");
const { json } = require("sequelize");

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // req.cookies 가능해짐
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    name: "Kcal-cal",
  })
);

// const cookieConfig = {
//   httpOnly: true, // 웹서버를 통해서만 쿠키 접근 가능 (js에서 접근 불가능)
//   maxAge: 24 * 60 * 60 * 1000, // 24시간 60분 60초 1000밀리초(1초) = 하루
//   // expires: 만료 날짜 설정
//   // secure: https에서만 쿠키 접근
//   // signed: 쿠키 암호화
// };

const indexRouter = require("./routes");
app.use("/", indexRouter);

// app.post("/main", async (req, res) => {
//   let result = await crawler(req.body.search);
//   res.send({ data: result });
// });

// Crawler;
// async function crawler(search) {
//   // ❶ HTML 로드하기
//   try {
//     const resp = await axios.get(
//       `https://www.myfitnesspal.com/ko/nutrition-facts-calories/${encodeURIComponent(
//         search
//       )}`
//     );
//     const $ = cheerio.load(resp.data); // ❷ HTML을 파싱하고 DOM 생성하기
//     const titleArray = $(".css-qumjp8"); // ❸ CSS 셀렉터로 원하는 요소 찾기
//     const kcalArray = $(".css-w1kjmb");

//     const brandAmountArray = $(".css-j7qwjs > .css-w1kjmb");

//     // const brandAmountArray = $(".smallText greyText greyLink");
//     // const amountArray = $(".css-w1kjmb");
//     // ➍ 찾은 요소를 순회하면서 요소가 가진 텍스트를 출력하기
//     titleArray.each((idx, el) => {
//       return $(el).text();
//     });
//     brandAmountArray.each((idx, el) => {
//       return $(el).text();
//     });
//     kcalArray.each((idx, el) => {
//       return $(el).text();
//     });

//     const foods = [];

//     for (let i = 0; i < titleArray.length; i++) {
//       let title = titleArray[i].children[0].data;
//       let brand = brandAmountArray[i].children[0].data;
//       let amount;

//       if (brandAmountArray[i].children.length < 7) {
//         brand = "브랜드 정보없음";
//         amount =
//           brandAmountArray[i].children[0].data +
//           brandAmountArray[i].children[4].data;
//       } else {
//         amount =
//           brandAmountArray[i].children[2].data +
//           brandAmountArray[i].children[6].data;
//       }

//       let kcalText = kcalArray.text();
//       kcalRegex = kcalText.match(/칼로리\s:\s\d{1,3}탄수화물+./g);
//       kcal = String(kcalRegex[i]).replace(/[^0-9]/g, "");

//       let carbsRegex = kcalText.match(/탄수화물:\s\d{1,3}g+./g);
//       carbs = String(carbsRegex[i]).replace(/[^0-9]/g, "");

//       let fatRegex = kcalText.match(/지방\s:\s\d{1,3}g+./g);
//       fat = String(fatRegex[i]).replace(/[^0-9]/g, "");

//       let proteinRegex = kcalText.match(/단백질\s:\s\d{1,3}./g);
//       protein = String(proteinRegex[i]).replace(/[^0-9]/g, "");

//       let array = { title, brand, kcal, amount, carbs, fat, protein };

//       // console.log(">>>", brandAmountArray[i].children[0].data);
//       foods.push(array);
//     }

//     return foods;
//   } catch (err) {
//     console.log(err);
//   }
// }

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
