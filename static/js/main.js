// function crawler 크롤러 값 리스트에 작성
const form = document.forms["search"];
function inputInformation() {
  axios({
    method: "POST",
    url: "/",
    data: {
      search: form.search.value,
    },
  })
    .then((res) => {
      return (data = res.data);
    })
    .then((data) => {
      const keys = Object.keys(data);
      const value = [];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        value[i] = data[key];
      }

      const foodsInformation = document.querySelectorAll(".foods-information");

      if (foodsInformation == null) {
        for (let i = 0; i < value[0].length; i++) {
          const html = `
            <li class="foods-information">
              <dl>
              <dt class="food-name">${value[0][i].title}</dt>
              <dd class="food-brand ">${value[0][i].brand}</dd>
              <dd class="food-vol">${value[0][i].amount}</dd>
            </dl>
            <div class="cal-box clearfix">
              <p class="food-kcal">${value[0][i].kcal}kcal</p>
              <p class="food-car">탄수화물 ${value[0][i].carbs}g</p>
              <p class="food-protein">단백질 ${value[0][i].protein}g</p>
              <p class="food-fat">지방 ${value[0][i].fat}g</p>
            </div>
            <div class="select" onclick="addKcal(${value[0][i].kcal});"><i class="fas fa-check"></i></div>
            <hr>
          </li>
         `;

          const foodList = document.querySelector(".food-list");
          foodList.insertAdjacentHTML("afterbegin", html);
        }
      } else {
        for (let i = 0; i < foodsInformation.length; i++) {
          foodsInformation[i].parentNode.removeChild(foodsInformation[i]);
        }
        for (let i = 0; i < value[0].length; i++) {
          const html = `
            <li class="foods-information">
              <dl>
              <dt class="food-name">${value[0][i].title}</dt>
              <dd class="food-brand ">${value[0][i].brand}</dd>
              <dd class="food-vol">${value[0][i].amount}</dd>
            </dl>
            <div class="cal-box clearfix">
              <p class="food-kcal">${value[0][i].kcal}kcal</p>
              <p class="food-car">탄수화물 ${value[0][i].carbs}g</p>
              <p class="food-protein">단백질 ${value[0][i].protein}g</p>
              <p class="food-fat">지방 ${value[0][i].fat}g</p>
            </div>
            <div class="select" onclick="addKcal(${value[0][i].kcal});"><i class="fas fa-check"></i></div>
            <hr>
          </li>
          `;

          const foodList = document.querySelector(".food-list");
          foodList.insertAdjacentHTML("afterbegin", html);
        }
      }
    });
}

//function kcal gage  칼로리 값 게이지에 적용
function addKcal(kcal) {
  console.log("kcal", kcal);
  const kcalTotal = 1700;
  let container1Wedge = document.querySelector(".container1 .wedge");
  let container2Wedge = document.querySelector(".container2 .wedge");
  let markerEnd = document.querySelector(".end");

  let kcalPercent = (kcal / kcalTotal) * 100;
  let anglePercent = kcalPercent;
  let angle = (anglePercent / 100) * 360;

  let caculate;
  let caculate2;

  if (container1Wedge.style.transform == "") {
    caculate = 0;
  } else {
    caculate = Number(
      String(container1Wedge.style.transform).replace(/[^0-9.]/g, "")
    );
  }

  if (container2Wedge.style.transform == "") {
    caculate2 = 0;
  } else {
    caculate2 = Number(
      String(container2Wedge.style.transform).replace(/[^0-9.]/g, "")
    );
  }

  if (caculate2 >= 180) {
    container2Wedge.style.transform = "rotateZ(180deg)";
    container1Wedge.style.transform = "rotateZ(180deg)";
  } else if (caculate >= 180) {
    container1Wedge.style.transform = "rotateZ(180deg)";
    container2Wedge.style.transform = `rotateZ(${angle + caculate2}deg)`;
    markerEnd.style.transform = `rotateZ(${angle + caculate + caculate2}deg)`;
  } else {
    container1Wedge.style.transform = `rotateZ(${angle + caculate}deg)`;
    markerEnd.style.transform = `rotateZ(${angle + caculate}deg)`;
  }

  console.log("caculate>>", caculate);
  console.log("caculate2>>", caculate2);
}

function closeWin() {
  var chk = document.getElementById("Notice");
  if (chk.checked) {
    setCookie("Notice", "done", 1);
  }
}
if (getCookie("Notice") == "done") {
  hidebox();
}
