// const { default: axios } = require("axios");

// function homeloginpage() {
//   const form = document.forms["form_login"];

//   if (!form.checkValidity()) {
//     form.reportValidity();
//     return;
//   }

//   axios({
//     method: "POST",
//     url: "/login",
//     data: {
//       userid: form.id.value,
//       userpw: form.pw.value,
//     },
//   })
//     .then((res) => {
//       return res.data;
//     })
//     .then((data) => {
//       // if (data) {
//       //   console.log(data);
//       //   alert("");
//       //   // document.location.href = "/main";
//       //   return;
//       // } else {
//       //   alert("로그인이 실패하였습니다.");
//       //   document.location.href = "/login";
//       // }
//     });
// }

Kakao.init("2609470f9ce5ccc0f948de565ceda807"); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단

function kakaoSignup() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          axios({
            method: "POST",
            url: "/kakaosignup",
            data: {
              userid: response.id,
              useremail: response.kakao_account.email,
              nickname: response.properties.nickname,
            },
          })
            .then((response) => {
              return response.data;
            })
            .then((data) => {
              if (data) {
                document.location.href = "/login";
                return;
              } else {
                alert("이미 회원가입을 하셨습니다! 로그인 해주세요!");
                document.location.href = "/login";
              }
            });
          console.log(response);
          console.log(response.properties);
          console.log(response.properties.nickname);
          console.log(response.kakao_account.email);
          console.log(response.id);
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

function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          axios({
            method: "POST",
            url: "/loginkakao",
            data: {
              useremail: response.kakao_account.email,
            },
          })
            .then((response) => {
              return response.data;
            })
            .then((data) => {
              if (data) {
                if (data.height === undefined) {
                  document.location.href = "/main";
                  alert("정보수정에서 다른 정보들을 기입해 주세요!");
                  return;
                } else {
                  document.location.href = "/main";
                  return;
                }
              } else {
                alert(
                  "로그인이 실패했습니다! 회원이 아니시라면 회원가입을 먼저 해주세요!"
                );
                document.location.href = "/login";
              }
            });
          console.log(response);
          console.log(response.properties);
          console.log(response.properties.nickname);
          console.log(response.kakao_account.email);
          console.log(response.id);
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
