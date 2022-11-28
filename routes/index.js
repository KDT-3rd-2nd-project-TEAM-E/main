const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();

// router.use("/auth", require("./auth")); // 카카오 로그인 인증

// 기본주소: localhost:PORT

// GET / => localhost:PORT/
router.get("/", controller.index); // intro => index

router.get("/main", controller.main);

// router.post("/main", controller.crawler);

router.get("/sub1", controller.sub1);

router.get("/sub2", controller.sub2);

router.get("/sub3", controller.sub3);

router.get("/login", controller.getlogin);

router.post("/login", controller.postlogin);

router.post("/login/findId", controller.findId); //ID찾기

router.get("/testlogin", controller.testlogin);

router.post("/kakaosignup", controller.kakaosignup);

router.post("/loginkakao", controller.loginkakao);

router.get("/signup", controller.getsignup);

router.post("/signup", controller.postsignup);
router.post("/signup/checkid", controller.checkid);
router.post("/signup/firstValidation", controller.signupCheckId);

router.post("/login/mail", controller.sendEmail);

// router.get("/bmi", controller.bmi);

// router.get("/testsearchkakao", controller.testsearchkakao);

router.get("/mypage", controller.mypage);

router.post("/mypage/edit", controller.mypageEdit); // 개인정보 수정

router.delete("/mypage/delete", controller.mypageDelete); // 회원탈퇴

router.get("/logout", controller.logout);

// router.delete("/delete/customer", controller.deleteCustomer);
// get, post 등의 순서로 할지 페이지의 순서대로 할지 보기 좋게 정렬

module.exports = router;
