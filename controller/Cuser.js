const { User } = require("../models");
const models = require("../models"); // ../models/index.js

exports.index = (req, res) => {
  res.render("index");
};

exports.main = (req, res) => {
  res.render("main", { activeMenu: "main" });
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
      res.send(false);
      return;
    } else {
      console.log("회원가입 기록O", result);
      res.send(true);
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
      res.send(true); // 로그인 성공
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
  res.render("mypage");
};

// exports.mypageEdit = async (req, res) => {
//   let result1 = await models.User.update(
//     {
//       userpw: req.body.userpw,
//       nickname: req.body.nickname,
//       age: req.body.age,
//       height: req.body.height,
//     },
//     {
//       where: {
//         userid: req.body.userid,
//       },
//     }
//   );
//   let result2 = await models.Userweight.create(
//     {
//       weight: req.body.weight,
//       date: req.body.date,
//     },
//     {
//       where: {
//         userid: req.body.userid,
//       },
//     }
//   );

//   res.send(`${req.body.nickname}님 회원정보가 변경되었습니다.`, {
//     user: result1,
//     userweight: result2,
//   });
// };

exports.mypageEdit = (req, res) => {
  models.User.update(
    {
      userpw: req.body.userpw,
      nickname: req.body.nickname,
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
    res.send(`${req.body.nickname}님 회원정보가 변경되었습니다.`);
  });
};

exports.mypageEdit = (req, res) => {
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
  console.log("UserDelete 성공 >>");
  // res.send(`${req.body.nickname}님 회원탈퇴가 완료되었습니다.`);
  res.render("index", { user: result1, userweight: result2 });
};
// 삭제 후 초기화면 렌더링, 회원정보삭제 되었습니다 라는 알림은 프론트에서 작업

exports.info = (req, res) => {
  res.render("info");
};
