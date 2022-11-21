const express = require("express");
const controller = require("../controller/Cvisitor");
const router = express.Router();

// 기본주소: localhost:PORT

// GET / => localhost:PORT/
router.get("/", controller.main);
router.get("/getCustomers", controller.getCustomers);
router.get("/getOrderlists", controller.getOrderlists);
router.get("/getTotal", controller.getTotal);
router.get("/getSql", controller.getSql);

router.delete("/delete/customer", controller.deleteCustomer);
// get, post 등의 순서로 할지 페이지의 순서대로 할지 보기 좋게 정렬

module.exports = router;
