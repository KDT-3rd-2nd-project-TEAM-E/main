function login() {
  const form = document.forms["form_login"];

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  axios({
    method: "POST",
    url: "/login",
    data: {
      userid: form.id.value,
      userpw: form.pw.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        document.location.href = "/main";
        return;
      } else {
        alert("로그인이 실패하였습니다.");

        document.location.href = "/login";
      }
    });
}
