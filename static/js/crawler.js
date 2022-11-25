// function crawler 크롤러 값 리스트에 작성
const form = document.forms["search"];

form.addEventListener("submit", (event) => {
  event.preventDefault();
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
    <div class="select" onclick="addKcal(${value[0][i].kcal},${value[0][i].carbs},${value[0][i].protein},${value[0][i].fat});"><i class="fas fa-check"></i></div>
    <hr>
    </li>
    `;

          const foodList = document.querySelector(".food-list");
          foodList.insertAdjacentHTML("afterbegin", html);
        }
      }
    });
});
