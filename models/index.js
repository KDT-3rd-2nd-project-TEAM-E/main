"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"]; // 개발용
// const config = require(__dirname + '/../config/config.json')['production']; // 배포용

const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
// sequelize 객체 선언시 매개변수로 다음 정보들을 받음: 데이터베이스명, 사용자, 비밀번호, 정보전체

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db = {"sequelize": sequelize, "Sequelize": Sequelize}

db.Visitor = require("./Visitor")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);
// 테이블 하나당 models파일 추가 - 파일명 - 테이블명 앞글자 대문자로

// [Sequelize에서 foreign key 설정하는 방법]
// Customer : Orderlist = 1 : N 관계
// Orderlist table은 Customer의 pk인 user_id를 customer_id 이름으로 foreign key를 가짐
// ex.
// db.Customer.hasMany(db.Orderlist, {
//   foreignKey: 'customer_id',
//   sourceKey: 'user_id',
// });
// db.Orderlist.belongsTo(db.Customer, {
//   foreignKey: 'customer_id',
//   targetKey: 'user_id',
// });

module.exports = db;
