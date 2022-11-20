Kakao.init("2609470f9ce5ccc0f948de565ceda807"); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단
//카카오로그인
function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
    fail: function (error) {
      console.log(error);
    },
  });
}
//카카오로그아웃
function kakaoLogout() {
  if (Kakao.Auth.getAccessToken()) {
    Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
    Kakao.Auth.setAccessToken(undefined);
  }
}
// 네이버 로그인
var naverLogin = new naver.LoginWithNaverId({
  clientId: "C3dt4QoaXUtAKOrk2Qju", //내 애플리케이션 정보에 cliendId를 입력해줍니다.
  callbackUrl: "http://localhost:8000/naverLogin", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
  isPopup: false,
  callbackHandle: true,
});
naverLogin.init();
window.addEventListener("load", function () {
  naverLogin.getLoginStatus(function (status) {
    if (status) {
      var email = naverLogin.user.getEmail(); // 필수로 설정할것을 받아와 아래처럼 조건문을 줍니다.
      console.log(naverLogin.user);
      if (email == undefined || email == null) {
        alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
        naverLogin.reprompt();
        return;
      }
    } else {
      console.log("callback 처리에 실패하였습니다.");
    }
  });
});
// 네이버 로그아웃
// 네이버는 이용자 보호를 위해 정책상 네이버 이외의 서비스에서 로그아웃을 수행하는 것을 허락하지 않는다고 합니다.
// => 팝업으로 네이버창을 띄우고 그 창에서 로그아웃 처리 한 후 자동으로 창 닫히게 수행
var testPopUp;
function openPopUp() {
  testPopUp = window.open(
    "https://nid.naver.com/nidlogin.logout",
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1"
  );
}
function closePopUp() {
  testPopUp.close();
}
function naverLogout() {
  openPopUp();
  setTimeout(function () {
    closePopUp();
  }, 10);
}
// 구글 로그인
//처음 실행하는 함수
function init() {
  gapi.load("auth2", function () {
    gapi.auth2.init();
    options = new gapi.auth2.SigninOptionsBuilder();
    options.setPrompt("select_account");
    // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
    options.setScope(
      "email profile openid https://www.googleapis.com/auth/user.birthday.read"
    );
    // 인스턴스의 함수 호출 - element에 로그인 기능 추가
    // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
    gapi.auth2
      .getAuthInstance()
      .attachClickHandler(
        "GgCustomLogin",
        options,
        onSignIn,
        onSignInFailure
      );
  });
}
function onSignIn(googleUser) {
  var access_token = googleUser.getAuthResponse().access_token;
  $.ajax({
    // people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
    url: "https://people.googleapis.com/v1/people/me",
    // key에 자신의 API 키를 넣습니다.
    data: {
      personFields: "birthdays",
      key: "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",
      access_token: access_token,
    },
    method: "GET",
  })
    .done(function (e) {
      //프로필을 가져온다.
      var profile = googleUser.getBasicProfile();
      console.log(profile);
    })
    .fail(function (e) {
      console.log(e);
    });
}
function onSignInFailure(t) {
  console.log(t);
}
