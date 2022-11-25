function closeWin() {
  var chk = document.getElementById("Notice");
  if (chk.checked) {
    setCookie("Notice", "done", 1);
  }
}
if (getCookie("Notice") == "done") {
  hidebox();
}
