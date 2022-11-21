const models = require("../models"); // ../models/index.js

exports.index = (req, res) => {
  res.render("index");
};

exports.main = (req, res) => {
  res.render("main");
};

exports.login = (req, res) => {
  res.render("login");
};

exports.signup = (req, res) => {
  res.render("signup");
};

exports.login = (req, res) => {
  // 알고리즘
  // 추가
  res.send("login성공");
};

exports.bmi = (req, res) => {
  res.render("bmi");
};

exports.mypage = (req, res) => {
  res.render("mypage");
};

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
  models.Userweight.update(
    {
      weight: req.body.weight,
      Date: req.body.Date,
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

exports.mypageDelete = (req, res) => {
  models.User.destroy({
    where: {
      userid: req.body.userid,
    },
  }).then((result) => {
    console.log("UserDelete 성공 >>", result);
    res.send(`${req.body.nickname}님 회원탈퇴가 완료되었습니다.`);
  });
};

exports.info = (req, res) => {
  res.render("info");
};
