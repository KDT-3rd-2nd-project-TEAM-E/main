window.onload = () => {
  const button = document.querySelector("#btnCalc");
  button.addEventListener("click", calculateBMI);
};
const BMIform = document.forms["bmiCheckForm"];
BMIform.addEventListener("submit", function calculateBMI(event) {
  event.preventDefault();
  const length = parseInt(document.querySelector("#length").value);
  const weight = parseInt(document.querySelector("#weight").value);
  const resultText = document.querySelector("#resultText");
  const bmiNumber = document.querySelector("#bmiNumber");
  const graphResult = document.querySelector(".graphResult");
  const home = document.querySelector(".home");
  if (length === "" || isNaN(length)) {
    resultText.innerHTML = "키를 입력해 주세요!";
  } else if (weight === "" || isNaN(weight)) {
    bmiNumber.innerHTML = "몸무게를 입력해 주세요!";
  } else {
    const bmi = (weight / ((length * length) / 10000)).toFixed(2);
    bmiNumber.innerHTML = ` / BMI 지수 : ${bmi}`;
    home.style.display = "block";
    if (bmi <= 18.5) {
      resultText.innerHTML = `저체중`;
      graphResult.innerHTML = `저체중이시네요, 건강을 위해 체중증가를 권유드려요`;
      home.style.left = `${bmi}%`;
    } else if (bmi <= 23) {
      resultText.innerHTML = `정상`;
      graphResult.innerHTML = `건강한 체중을 가지고 계십니다`;
      home.style.left = `${bmi}%`;
    } else if (bmi <= 25) {
      resultText.innerHTML = `과체중`;
      graphResult.innerHTML = `정상 체중보다 조금 더 과해요!`;
      home.style.left = `${bmi}%`;
    } else if (bmi <= 30) {
      resultText.innerHTML = `비만`;
      graphResult.innerHTML = `정상 체중에 도달하기 위해 운동을 해볼까요?`;
      home.style.left = `${bmi}%`;
    } else {
      resultText.innerHTML = `고도비만`;
      graphResult.innerHTML = `정상 체중에 도달하기 위해 kcal-cal과 함께해요`;
      home.style.left = `${bmi}%`;
    }
  }
});
