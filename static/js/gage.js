let addCvalue = 0;
let addPvalue = 0;
let addFvalue = 0;
let addKvalue = 0;

function addKcal(kcal, carbs, protein, fat) {
  console.log("kcal", kcal);
  console.log("carbs", carbs);
  console.log("protein", protein);
  console.log("fat", fat);
  const kcalTotal = 1700;

  let kcalPercent = parseInt((kcal / kcalTotal) * 100);
  let kcalBar = document.querySelector(".kcal-bar");
  let kcalValue = document.querySelector(".kcal-value");

  let cpRecommend = (kcalTotal * 0.4) / 4;
  let fRecommend = (kcalTotal * 0.4) / 9;

  let cValue = parseInt((carbs / cpRecommend) * 100);
  let pValue = parseInt((protein / cpRecommend) * 100);
  let fValue = parseInt((fat / fRecommend) * 100);

  let cGraph = document.querySelector(".carbs");
  let pGraph = document.querySelector(".protein");
  let fGraph = document.querySelector(".fat");

  addCvalue = addCvalue + cValue;
  addPvalue = addPvalue + pValue;
  addFvalue = addFvalue + fValue;

  kcalBar.style = `width: ${kcalPercent}%`;
  cGraph.style = `--p:${addCvalue}`;
  pGraph.style = `--p:${addPvalue}`;
  fGraph.style = `--p:${addFvalue}`;

  kcalValue.innerText = `${kcalPercent}%`;
  cGraph.innerText = `${addCvalue}%`;
  pGraph.innerText = `${addPvalue}%`;
  fGraph.innerText = `${addFvalue}%`;

  cGraph.classList.add("animate");
  pGraph.classList.add("animate");
  fGraph.classList.add("animate");

  const CkeyFrames = document.createElement("style");
  CkeyFrames.innerHTML = `@keyframes p {
    from{--p:${addCvalue - cValue}}
  }`;
  const PkeyFrames = document.createElement("style");
  PkeyFrames.innerHTML = `@keyframes p {
    from{--p:${addPvalue - pValue}}
  }`;
  const FkeyFrames = document.createElement("style");
  FkeyFrames.innerHTML = `@keyframes p {
    from{--p:${addFvalue - fValue}}
  }`;

  cGraph.appendChild(CkeyFrames);
  pGraph.appendChild(PkeyFrames);
  fGraph.appendChild(FkeyFrames);

  setTimeout(() => {
    cGraph.classList.remove("animate");
    pGraph.classList.remove("animate");
    fGraph.classList.remove("animate");
  }, 1500);
}
