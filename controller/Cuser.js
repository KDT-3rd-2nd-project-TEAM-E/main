const { User } = require("../models");
const models = require("../models"); // ../models/index.js

exports.index = (req, res) => {
  const userSession = req.session.user;
  console.log("Session 출력 >> ", userSession);

  if (userSession !== undefined) {
    res.render("index", {
      isLogin: true,
    });
  } else {
    res.render("index", { isLogin: false });
  }
};

exports.main = (req, res) => {
  const userSession = req.session.user;
  console.log("Session 출력 >> ", userSession);

  if (userSession !== undefined) {
    res.render("main", {
      activeMenu: "main",
      isLogin: true,
      nickname: userSession.nickname,
    });
  } else {
    res.render("main", { activeMenu: "main", isLogin: false });
  }
};

exports.crawler = async (req, res) => {
  let result = await crawler(req.body.search);
  res.send({ data: result });

  async function crawler(search) {
    // ❶ HTML 로드하기
    try {
      const resp = await axios.get(
        `https://www.myfitnesspal.com/ko/nutrition-facts-calories/${encodeURIComponent(
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
        let brand = brandAmountArray[i].children[0].data;
        let amount;

        if (brandAmountArray[i].children.length < 7) {
          brand = "브랜드 정보없음";
          amount =
            brandAmountArray[i].children[0].data +
            brandAmountArray[i].children[4].data;
        } else {
          amount =
            brandAmountArray[i].children[2].data +
            brandAmountArray[i].children[6].data;
        }

        let kcalText = kcalArray.text();
        kcalRegex = kcalText.match(/칼로리\s:\s\d{1,3}탄수화물+./g);
        kcal = String(kcalRegex[i]).replace(/[^0-9]/g, "");

        let carbsRegex = kcalText.match(/탄수화물:\s\d{1,3}g+./g);
        carbs = String(carbsRegex[i]).replace(/[^0-9]/g, "");

        let fatRegex = kcalText.match(/지방\s:\s\d{1,3}g+./g);
        fat = String(fatRegex[i]).replace(/[^0-9]/g, "");

        let proteinRegex = kcalText.match(/단백질\s:\s\d{1,3}./g);
        protein = String(proteinRegex[i]).replace(/[^0-9]/g, "");

        let array = { title, brand, kcal, amount, carbs, fat, protein };

        // console.log(">>>", brandAmountArray[i].children[0].data);
        foods.push(array);
      }

      return foods;
    } catch (err) {
      console.log(err);
    }
  }
};

exports.sub1 = (req, res) => {
  res.render("sub1", { activeMenu: "sub1" });
};

exports.sub2 = (req, res) => {
  res.render("sub2", { activeMenu: "sub2" });
};

exports.sub3 = (req, res) => {
  res.render("sub3", { activeMenu: "sub3" });
};

exports.getlogin = (req, res) => {
  res.render("login");
};

exports.testlogin = (req, res) => {
  res.render("testlogin");
};

exports.kakaosignup = (req, res) => {
  models.User.create({
    userid: req.body.useremail,
    useremail: req.body.useremail,
    nickname: req.body.nickname,
  })
    .then((result) => {
      console.log("성공성공~", result);
      console.log(result.userid);
      // DB에 저장된 userid가 없을 경우 -> 회원가입성공->./login 렌더
      res.send(true);
    })
    .catch((result) => {
      // DB에 저장된 userid가 있을경우 -> 회원가입실패(이미 가입정보가 존재합니다. 로그인해주세요)->/login으로 렌더
      res.send(false);
    });
};

exports.loginkakao = (req, res) => {
  models.User.findOne({
    where: {
      useremail: req.body.useremail, // useremail로 DB값과 비교
    },
  }).then((result) => {
    if (result === null) {
      console.log("회원가입 기록X", result);
      //
      res.send(false, { isLogin: false });
      return;
    } else {
      console.log("회원가입 기록O", result);
      req.session.user = {
        isLogin: true,
        userid: result.userid,
        nickname: result.nickname,
        useremail: result.useremail,
      };
      console.log(req.session.user);
      res.redirect("/main");
    }
  });
};

exports.postlogin = (req, res) => {
  models.User.findOne({
    where: {
      userid: req.body.userid,
      userpw: req.body.userpw,
    },
  }).then((result) => {
    console.log("login 결과 >>", result); // [{}]
    if (result === null) {
      res.send(false); // 로그인 실패
      return;
    } else {
      req.session.user = {
        isLogin: true,
        userid: req.body.userid,
        userpw: req.body.userpw,
        useremail: result.useremail,
        nickname: result.nickname,
        gender: result.gender,
        age: result.age,
        height: result.height,
        weight: result.weight, // 안찍힘
        date: result.date, // 안찍힘
      };
      console.log(req.session.user);
      res.redirect("/main");
    }
  });
};

exports.findId = (req, res) => {
  models.User.findOne({
    where: {
      useremail: req.body.useremail,
    },
  }).then((result) => {
    console.log("ID 찾기 >>", result); // [{}]
    if (result === null) {
      res.send(false); // 해당 이메일에 대응하는 ID값 X
    } else {
      res.send(true); // ID값 출력 or 다른 처리
    }
  });
};

// exports.findPw = (req, res) => {
//   models.User.findOne({
//     where: {
//       userid: req.body.userid,
//       useremail: req.body.useremail,
//     },
//   }).then((result) => {
//     console.log("PW 찾기 >>", result); // [{}]
//     if (result === null) {
//       res.send(false); // 해당 ID, 이메일에 대응하는 PW값 X
//       // return
//     } else {
//       models.User.update(
//         {
//           userpw: 1111,
//         },
//         {
//           where: {
//             userid: req.body.id,
//           },
//         }
//       ).then((result) => {
//         console.log("PW초기화 >>", result); // update >> [ 1 ]
//       });
//       res.render("mypage"); // ID값 출력 or 다른 처리
//     }
//   });
// };

exports.findPw = (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("email required");
  }

  User.findOne({
    where: {
      email: req.body.email,
    },
  });
};

exports.getsignup = (req, res) => {
  res.render("signup");
};

// exports.postsignup = (req, res) => {
//   models.User.create({
//     userid: req.body.userid,
//     userpw: req.body.userpw,
//     useremail: req.body.useremail,
//     nickname: req.body.nickname,
//     gender: req.body.gender,
//     age: req.body.age,
//     height: req.body.height,
//   }).then((result) => {
//     console.log("creat >>", result); //{}
//     res.send(result);
//   });
// };

// exports.postsignweightup = (req, res) => {
//   // const User = models.User;
//   models.Userweight.create({
//     userid: req.body.userid,
//     weight: req.body.weight,
//   }).then((result) => {
//     console.log("creat >>", result); //{}
//     res.send(result);
//   });
// };

exports.postsignup = async (req, res) => {
  let result1 = await models.User.create({
    userid: req.body.userid,
    userpw: req.body.userpw,
    useremail: req.body.useremail,
    nickname: req.body.nickname,
    gender: req.body.gender,
    age: req.body.age,
    height: req.body.height,
  });
  let result2 = await models.Userweight.create({
    userid: req.body.userid,
    weight: req.body.weight,
  });
  console.log(result1);
  console.log(result2);

  res.send(true);
}; // axios요청 한버튼에 두개 -> 각기 다른 DB에 저장되게끔

exports.bmi = (req, res) => {
  // const query = `SELECT date, weight FROM userweight WHERE userid=userweight.userid ORDER BY Date DESC;`;
  const query = `SELECT date, weight FROM userweight WHERE userid=${req.body.userid} ORDER BY Date DESC;`;
  models.sequelize
    .query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then((result) => {
      // * Chrome 브라우저의 경우, JSONVue 확장프로그램 설치시 데이터 출력 결과를 가독성있게 볼 수 있음
      // https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc

      res.send(result);
    });
};

exports.testsearchkakao = (req, res) => {
  res.render("testsearchkakao");
};

exports.mypage = (req, res) => {
  const userSession = req.session.user;
  console.log("MyPage Session >> ", userSession);

  if (userSession !== undefined) {
    res.render("mypage", {
      isLogin: true,
      userid: userSession.userid,
      userpw: userSession.userpw,
      useremail: userSession.useremail,
      nickname: userSession.nickname,
      gender: userSession.gender,
      age: userSession.age,
      height: userSession.height,
    });
  } else {
    res.render("404");
  }
};

exports.mypageEdit = (req, res) => {
  models.User.update(
    {
      userid: req.body.userid,
      userpw: req.body.userpw,
      useremail: req.body.useremail,
      nickname: req.body.nickname,
      gender: req.body.gender,
      age: req.body.age,
      height: req.body.height,
    },
    {
      where: {
        userid: req.body.userid,
      },
    }
  ).then((result) => {
    console.log("UserEdit 성공 >>", result);
    console.log("전", req.session.user);
    if (result) {
      if (result === null) {
        res.send(false);
        return;
      } else {
        req.session.user = {
          isLogin: true,
          userid: req.body.userid,
          userpw: req.body.userpw,
          useremail: req.body.useremail,
          nickname: req.body.nickname,
          gender: req.body.gender,
          age: req.body.age,
          height: req.body.height,
        };
      }
      console.log("후", req.session.user);
      res.send(req.session.user);
    }
  });
};

exports.myweightEdit = (req, res) => {
  models.Userweight.create(
    {
      weight: req.body.weight,
      date: req.body.date,
    },
    {
      where: {
        userid: req.body.userid,
      },
    }
  ).then((result) => {
    console.log("UserweightEdit 성공 >>", result);
    res.send(`${req.body.nickname}님의 체중정보가 업데이트 되었습니다.`);
  });
};

exports.mypageDelete = async (req, res) => {
  let result1 = await models.User.destroy({
    where: {
      userid: req.body.userid,
    },
  });
  let result2 = await models.Userweight.destroy({
    where: {
      userid: req.body.userid,
    },
  });
  console.log("UserDelete 성공 >>", result1, result2);
  res.send("회원탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
};
// , {
//   user: result1,
//   userweight: result2,
// }
// 삭제 후 초기화면 렌더링, 회원정보삭제 되었습니다 라는 알림은 프론트에서 작업

exports.logout = (req, res) => {
  if (req.session.user !== undefined) {
    // req.session.destroy(콜백)
    // 콜백안에서 로그아웃 -> /리다이렉트
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.redirect("/");
    });
  } else {
    // 유저가 브라우저에서 /logout 경로로 직접 접근
    // res.send()
    // - alert('잘못된 접근입니다.)
    // - / 경로로 이동
    res.send(
      `<script>
      alert('잘못된 접근입니다!!')
      document.location.href = '/'
      </script>`
    );
  }
};
