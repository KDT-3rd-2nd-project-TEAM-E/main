const bars = document.querySelector(".bars");
const exit = document.querySelector(".times");

bars.addEventListener("click", function () {
  const clickNav = document.querySelector(".click-nav");
  clickNav.classList.toggle("none");
  bars.classList.toggle("none");
  exit.classList.toggle("none");
});
exit.addEventListener("click", function () {
  const clickNav = document.querySelector(".click-nav");
  clickNav.classList.toggle("none");
  bars.classList.toggle("none");
  exit.classList.toggle("none");
});
