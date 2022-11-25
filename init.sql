CREATE DATABASE kcalcal DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

SHOW databases;

USE kcalcal;

-- UNIQUE
    CREATE TABLE user (
        userid VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
        userpw VARCHAR(20),
        useremail VARCHAR(100) NOT NULL UNIQUE,
        nickname VARCHAR(10) NOT NULL,
        gender ENUM('F', 'M', '') DEFAULT '',
        age INT,
        height INT
    );

-- CREATE TABLE member(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     userid VARCHAR(20) NOT NULL UNIQUE,
--     userpw VARCHAR(20) NOT NULL
-- );

CREATE TABLE userweight(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(20) NOT NULL,
    date DATETIME DEFAULT NOW(), 
    weight INT
);

-- CREATE TABLE test(
--     userid VARCHAR(20) NOT NULL PRIMARY KEY UNIQUE,
--     Date DATETIME DEFAULT CURRENT_TIMESTAMP, 
--     NOW1 DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE socialKa ();

-- CREATE TABLE socialNa ();

-- CREATE TABLE socialGo  ();


SHOW tables;

DESC user;

DROP TABLE user;
DROP TABLE userweight;

SELECT * FROM user;
-- SELECT * FROM member;
SELECT * FROM userweight;

INSERT INTO user (userid, userpw, useremail, nickname, gender, age, height) VALUES ('aaa', 'aaa', 'aaa@aaa.aaa', 'aaa', 'M', 25, 178);
INSERT INTO user (userid, userpw, useremail, nickname, gender, age, height) VALUES ('bbb', 'bbb', 'bbb@bbb.bbb', 'bbb', 'F', 35, 168);

INSERT INTO member (userid, userpw) VALUES ('aaa', 'aaa');
INSERT INTO member (userid, userpw) VALUES ('bbb', 'bbb');

INSERT INTO userweight (userid, weight) VALUES ('aaa', 72); 
INSERT INTO test (userid) VALUES ('aaa'); 
SELECT * FROM test;
DROP TABLE test;

DELETE FROM user WHERE userid = 'archangel67@naver.com';


SELECT Date, weight FROM userweight WHERE userid='aaa' ORDER BY Date DESC;

-- 예시들
SELECT id, address FROM user; -- id, 주소 컬럼 조회
-- ASC: 오름차순 (기본값)
-- DESC: 내림차순
SELECT * FROM user WHERE id > 6 ORDER BY age ASC; -- id가 6초과인 사람 중 age컬럼 오름차순
-- LIKE: 패턴조회
-- %: 0개 이상의 문자
-- _: 1개의 단일 문자
SELECT * FROM user WHERE name LIKE '%희%'; -- 이름에 '희'가 있는 데이터
-- LIMIT: 데이터 개수 제한
SELECT * FROM user WHERE address LIKE '서울%' LIMIT 2;
-- BETWEEN a AND b: 사이값 조회
SELECT * FROM user WHERE age BETWEEN 25 AND 30;
-- IN (list): 리스트 있는 것 중에 일치하면 참
SELECT * FROM user WHERE age IN (20, 21, 22, 23);
--  논리연산자: AND, OR, NOT
SELECT * FROM user WHERE name LIKE '이%' AND age = 23; -- 이씨이자 23세인 사람
-- [UPDATE - UPDATE]
-- 데이터 갱신(수정)
UPDATE user SET address = '서울특별시 강북구' WHERE id = 1; -- 권장되는 방법
-- 주의)) update에서 where절 미사용시, 모든 행의 데이터가 변경됨
-- [DELETE - DELETE]
-- 데이터 삭제
-- 주의)) delete에서 where절 미사용시, 모든 행의 데이터가 삭제됨
DELETE FROM user WHERE id = 11;

-- DCL
-- mysql 사용자 추가 (user 계정)
CREATE USER 'user'@'%' IDENTIFIED BY '1234'; 
-- user 계정에 db 권한 부여 (모든 db에 접근 가능 설정)
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;
-- 현재 사용중인 mysql 캐시 지우고 새로운 설정 적용
FLUSH PRIVILEGES;

-- 비밀번호 변경하고 싶다면?
ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY '1234';