const express = require('express');
const cookieParser = require('cookie-parser');
// cookie-parser
// 요청의 쿠키를 해석해서 req.cookies 객체로 만듦
// ex. name=hello 라는 쿠키를 보내면, req.cookies -> { name : 'hello' }
// 유효기간이 지난 쿠키는 알아서 제거
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(cookieParser());

const cookieConfig = {
  httpOnly: true, // 웹 서버를 통해서만 쿠키 접근 가능 (js에서 접근 불가능)
  maxAge: 60 * 1000, // 1min: 유효 시간 (단위 : 밀리초)
  // expires: 만료 날짜 설정
  // secure : https 에서만 쿠키 접근 가능하게 설정
  // signed: 쿠키 암호화 설정
}

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cookie', (req, res) => {
  res.cookie('myKey1', 'myValue1', cookieConfig); // 쿠키 설정
  res.send('set cookie'); // 응답을 보냄
});