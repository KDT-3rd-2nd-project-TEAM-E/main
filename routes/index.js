const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();

// 기본주소: localhost:PORT

// GET / => localhost:PORT/
router.get("/", controller.index); // intro => index


router.get("/main", controller.main);

router.get("/login", controller.login);

router.post("/login", controller.login);

router.get("/bmi", controller.bmi);

router.get("/mypage", controller.mypage);

router.patch("/mypage/edit", controller.mypageEdit); // 개인정보 수정

router.delete("/mypage/delete", controller.mypageDelete); // 회원탈퇴

router.get("/info", controller.info);

// router.delete("/delete/customer", controller.deleteCustomer);
// get, post 등의 순서로 할지 페이지의 순서대로 할지 보기 좋게 정렬

module.exports = router;

