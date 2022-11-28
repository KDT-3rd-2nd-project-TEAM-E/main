function closeWin() {
  var chk = document.getElementById("Notice");
  if (chk.checked) {
    setCookie("Notice", "done", 1);
  }
}
if (getCookie("Notice") == "done") {
  hidebox();
}
/*------------------------------*/
let mainText = document.querySelector(".start div");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  if (value > 300) {
    mainText.style.animation = "disappear 1s ease-out forwards";
  } else mainText.style.animation = "slide 1s ease-out";
});
let mainText1 = document.querySelector(".start img");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  if (value > 300) {
    mainText1.style.animation = "disappear 1s ease-out forwards";
  } else {
    mainText1.style.animation = "right 1s ease-out";
  }
});
let mainText2 = document.querySelector(".record div");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  if (value > 700) {
    mainText2.style.animation = "right 1s ease-out ";
  } else {
    mainText2.style.animation = "disappear 1s ease-out forwards";
  }
});
let mainText3 = document.querySelector(".record img");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  if (value > 700) {
    mainText3.style.animation = "slide 1s ease-out";
  } else {
    mainText3.style.animation = "disappear 1s ease-out  forwards";
  }
});
let mainText4 = document.querySelector(".target");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  if (value > 1300) {
    mainText4.style.animation = "slide 1s ease-out";
  } else {
    mainText4.style.animation = "disappear 1s ease-out  forwards";
  }
});
let mainText5 = document.querySelector(".idea");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  if (value > 2500) {
    mainText5.style.animation = "right 1s ease-out";
  } else {
    mainText5.style.animation = "disappear 1s ease-out  forwards";
  }
});
