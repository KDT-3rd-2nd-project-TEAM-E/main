// id 중복확인 버튼 눌렀을 때 검사
const form = document.forms["form_register"];
const msg = document.querySelector("#idError");

function idCheck() {
  console.log("중복확인 클릭");
  //console.log(data.userid.value);
  console.dir(form);

  const data = {
    userid: form.userid.value,
  };

  //정규식
  let regId = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,12}$/;

  if (!form.userid.checkValidity()) {
    alert("아이디를 입력해주세요.");
    userid.focus();
    msg.textContent = "";
    return;
  }
  if (!regId.test(data.userid)) {
    alert(
      "아이디는 최소 5자 최대 12자 이내의 숫자, 영문 조합으로 만들어주세요."
    );
    document.querySelector("#userid").focus();
    msg.textContent = "";
    return;
  }

  axios({
    method: "POST",
    url: "/signup/checkid",
    data: {
      userid: data.userid,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        document.getElementById("idError").classList.remove("error");
        document.getElementById("idError").classList.add("correct");
        msg.textContent = "아이디 사용이 가능합니다!";
        //document.getElementById("idError").setAttribute("style", "color:green");

        userid.focus();
      } else {
        // document.getElementById("idError").classList.add("error");
        document.getElementById("idError").classList.remove("correct");
        document.getElementById("idError").classList.add("error");
        msg.textContent = "이미 존재하는 아이디입니다.";
        //document.getElementById("idError").setAttribute("style", "color:red");
        return;
      }
    });
}

// 회원가입 first Section 다음 버튼 눌렀을 때 유효성 검사
function firstNext() {
  // const data = {
  //   userid: form.userid.value,
  //   userpw: form.userpw.value,
  //   checkpw: form.checkpw.value,
  // };
  let regPw =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  // 1. ID ) 중복확인 검사 X
  if (msg.innerHTML == "") {
    alert("아이디 중복검사를 해주세요.");
    return;
  }
  if (form.userpw.value == "") {
    alert("비밀번호를 입력해주세요.");
    userpw.focus();
    return false;
  } else if (!regPw.test(form.userpw.value)) {
    alert(
      "비밀번호는 공백을 제외한 최소 8자 최대 16자 이내 숫자, 영문, 특수문자를 모두 포함하여 작성해주세요."
    );
    userpw.focus();
    return false;
  }

  if (form.checkpw.value == "") {
    alert("비밀번호 확인이 필요합니다.");
    checkpw.focus();
    return false;
  }
  if (form.userpw.value !== form.checkpw.value) {
    alert("비밀번호가 일치하지 않습니다.");
    checkpw.focus();
    return false;
  }

  axios({
    method: "POST",
    url: "/signup/firstValidation",
    data: {
      userid: form.userid.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        console.log("다음으로 넘어간닷!!!!!");
        alert("다음단계로 넘어갑니다.");
        document.getElementById("idError").classList.remove("error");
        document.getElementById("idError").classList.add("correct");
        msg.textContent = "아이디 사용이 가능합니다!";
        document.getElementById("firstSection").classList.add("d-none");
        document.getElementById("secondSection").classList.remove("d-none");
      } else {
        alert("다른 아이디를 입력해주세요.");
        document.getElementById("idError").classList.remove("correct");
        document.getElementById("idError").classList.add("error");
        msg.textContent = "이미 존재하는 아이디입니다.";
        return false;
      }
    });
  //3. PW ) 비밀번호 유효성 검사
  // (숫자, 영문, 특수문자 조합 8~16자리), (공백 space X)
  // console.log("다음으로 넘어간닷!!!!!");
  // document.getElementById("firstSection").classList.add("d-none");
  // document.getElementById("secondSection").classList.remove("d-none");

  // 2. PW) 비밀번호 or 비밀번호확인 input 입력 X, 불일치
  // axios({
  //   method: "POST",
  //   url: "/signup/firstValidation",
  //   data: {
  //     userid: form.userid.value,
  //     userpw: form.userpw.value,
  //     checkpw: form.checkpw.value,
  //   },
  // })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .then((data) => {
  //     if (form.userpw.value == "") {
  //       alert("비밀번호를 입력해주세요.");
  //       userpw.focus();
  //       return false;
  //     } else if (!regPw.test(form.userpw.value)) {
  //       alert(
  //         "비밀번호는 공백을 제외한 최소 8자 최대 16자 이내 숫자, 영문, 특수문자를 모두 포함하여 작성해주세요."
  //       );
  //       userpw.focus();
  //       return false;
  //     }

  //     if (form.checkpw.value == "") {
  //       alert("비밀번호 확인이 필요합니다.");
  //       checkpw.focus();
  //       return false;
  //     }
  //     if (form.userpw.value !== form.checkpw.value) {
  //       alert("비밀번호가 일치하지 않습니다.");
  //       checkpw.focus();
  //       return false;
  //     }
  //     if (form.userid.value !== data.userid) {
  //       alert("아이디 중복 확인이 필요합니다.");
  //       userid.focus();
  //       return;
  //     }
  //     //3. PW ) 비밀번호 유효성 검사
  //     // (숫자, 영문, 특수문자 조합 8~16자리), (공백 space X)
  //     console.log("다음으로 넘어간닷!!!!!");
  //     document.getElementById("firstSection").classList.add("d-none");
  //     document.getElementById("secondSection").classList.remove("d-none");
  //   });
}

// 닉네임 글자수 제한 (16Byte)
function fnChkByte(obj, maxByte) {
  var str = obj.value;
  var str_len = str.length;

  console.log(str);
  var rbyte = 0;
  var rlen = 0;
  var one_char = "";
  var str2 = "";

  for (var i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      rbyte += 2; //한글 2byte
    } else {
      rbyte++; // 나머지 1byte
    }

    if (rbyte <= maxByte) {
      rlen = i + 1; // return 할 문자열 갯수
    }
  }
  if (rbyte > maxByte) {
    alert("닉네임은 영문, 숫자 16자(한글 8자)를 초과할 수 없습니다.");
    str2 = str.substr(0, rlen);
    obj.value = str2;
    fnChkByte(obj, maxByte);
  } else {
    return;
  }
}

function firstBack() {
  console.log("이전으로 호잇!");
  document.getElementById("firstSection").classList.remove("d-none");
  document.getElementById("secondSection").classList.add("d-none");
}

function secondBack() {
  console.log("이전으로 호잇!");
  document.getElementById("secondSection").classList.remove("d-none");
  document.getElementById("thirdSection").classList.add("d-none");
}

function secondNext() {
  const data = {
    useremail: form.useremail.value,
    gender: form.gender.value,
    nickname: form.nickname.value,
    age: form.userage.value,
    height: form.userheight.value,
  };

  if (data.useremail == "") {
    alert("이메일을 입력해주세요.");
    useremail.focus();
    return;
  }
  if (data.nickname == "") {
    alert("닉네임을 입력해주세요.");
    document.querySelector("#nickname").focus();
    return;
  }

  if (data.age == "") {
    alert("나이를 입력해주세요.");
    document.querySelector("#userage").focus();
    return;
  } else if (data.age < 14 || data.age > 99) {
    alert("나이는 14세 이상 99세 이하로 입력가능합니다.");
    document.querySelector("#userage").focus();
    return;
  }

  if (data.height == "") {
    alert("키를 입력해주세요.");
    document.querySelector("#userheight").focus();
    return;
  } else if (data.height < 100 || data.height > 230) {
    alert("키는 100cm 이상 230cm 이하로 입력 가능합니다");
    document.querySelector("#userheight").focus();
    return;
  }

  if (data.gender == "") {
    alert("성별을 선택해주세요.");
    return;
  } else {
    console.log("가보자고!!!!!");
    document.getElementById("secondSection").classList.add("d-none");
    document.getElementById("thirdSection").classList.remove("d-none");
  }
}

function register() {
  const data = {
    userid: form.userid.value,
    userpw: form.userpw.value,
    useremail: form.useremail.value,
    nickname: form.nickname.value,
    gender: form.gender.value,
    age: form.userage.value,
    height: form.userheight.value,
    weight: form.userweight.value,
  };

  if (data.weight == "" || data.weight < 10 || data.weight > 999) {
    alert("몸무게는 10kg 이상 999kg 이하로 입력해주세요.");
    document.querySelector("#userweight").focus();
    return;
  }

  axios({
    method: "POST",
    url: "/signup",
    data: {
      userid: data.userid,
      userpw: data.userpw,
      useremail: data.useremail,
      nickname: data.nickname,
      gender: data.gender,
      age: data.age,
      height: data.height,
      weight: data.weight,
    },
  }).then((res) => {
    if (true) {
      alert("회원가입이 완료되었습니다! 로그인을 해서 서비스를 즐겨보세요!!");
      window.location.href = "/login";
      return;
    } else {
      alert("회원가입이 올바르게 되지 않았습니다. 다시 시도해주세요!");
      window.location.href = "/signup";
    }
  });
}
