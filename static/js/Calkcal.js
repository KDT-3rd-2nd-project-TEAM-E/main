let addCvalue = 0;
let addPvalue = 0;
let addFvalue = 0;
let addKvalue = 0;

const kcalTotal = 1700;
document.querySelector(".kcal-total").innerText = `${kcalTotal}`;
let cpRecommend = (kcalTotal * 0.4) / 4;
let fRecommend = (kcalTotal * 0.4) / 9;

let carbsText = document.querySelector(".carbs-text");
let proteinText = document.querySelector(".protein-text");
let fatText = document.querySelector(".fat-text");

carbsText.innerText = `${parseInt(cpRecommend)}`;
proteinText.innerText = `${parseInt(cpRecommend)}`;
fatText.innerText = `${parseInt(fRecommend)}`;

function addKcal(kcal, carbs, protein, fat) {
  let kcalPercent = parseInt((kcal / kcalTotal) * 100);
  let kcalBar = document.querySelector(".kcal-bar");
  let kcalValue = document.querySelector(".kcal-value");

  let cValue = parseInt((carbs / cpRecommend) * 100);
  let pValue = parseInt((protein / cpRecommend) * 100);
  let fValue = parseInt((fat / fRecommend) * 100);

  let cGraph = document.querySelector(".carbs");
  let pGraph = document.querySelector(".protein");
  let fGraph = document.querySelector(".fat");

  addKvalue = addKvalue + kcalPercent;
  addCvalue = addCvalue + cValue;
  addPvalue = addPvalue + pValue;
  addFvalue = addFvalue + fValue;

  if (addKvalue >= 100) {
    kcalBar.style = `width: 100%`;
  } else {
    kcalBar.style = `width: ${addKvalue}%`;
    kcalBar.classList.add("bar-animate");
    setTimeout(() => {
      kcalBar.classList.remove("bar-animate");
    }, 1500);
  }

  cGraph.style = `--p:${addCvalue}`;
  pGraph.style = `--p:${addPvalue}`;
  fGraph.style = `--p:${addFvalue}`;

  let carbsValue = document.querySelector(".carbs-value");
  let proteinValue = document.querySelector(".protein-value");
  let fatValue = document.querySelector(".fat-value");

  kcalValue.innerText = `${addKvalue}%`;
  carbsValue.innerText = `${addCvalue}%`;
  proteinValue.innerText = `${addPvalue}%`;
  fatValue.innerText = `${addFvalue}%`;

  cGraph.classList.add("cAnimation");
  pGraph.classList.add("pAnimation");
  fGraph.classList.add("fAnimation");

  const BKeyFrames = document.createElement("style");
  BKeyFrames.innerHTML = `@keyframes bar{
    from {
      width: ${addKvalue - kcalPercent}%;
    }
  }`;

  const CkeyFrames = document.createElement("style");
  CkeyFrames.innerHTML = `@keyframes cAnimation {
    from{--p:${addCvalue - cValue}}
  }`;
  const FkeyFrames = document.createElement("style");
  FkeyFrames.innerHTML = `@keyframes fAnimation {
    from{--p:${addFvalue - fValue}}
  }`;
  const PkeyFrames = document.createElement("style");
  PkeyFrames.innerHTML = `@keyframes pAnimation {
    from{--p:${addPvalue - pValue}}
  }`;

  kcalBar.appendChild(BKeyFrames);
  cGraph.appendChild(CkeyFrames);
  pGraph.appendChild(PkeyFrames);
  fGraph.appendChild(FkeyFrames);

  setTimeout(() => {
    cGraph.classList.remove("cAnimation");
    pGraph.classList.remove("pAnimation");
    fGraph.classList.remove("fAnimation");
  }, 1500);
}

function minusKcal(kcal, carbs, protein, fat) {
  let kcalPercent = parseInt((kcal / kcalTotal) * 100);
  let kcalBar = document.querySelector(".kcal-bar");
  let kcalValue = document.querySelector(".kcal-value");

  let cValue = parseInt((carbs / cpRecommend) * 100);
  let pValue = parseInt((protein / cpRecommend) * 100);
  let fValue = parseInt((fat / fRecommend) * 100);

  let cGraph = document.querySelector(".carbs");
  let pGraph = document.querySelector(".protein");
  let fGraph = document.querySelector(".fat");

  addKvalue = addKvalue - kcalPercent;
  addCvalue = addCvalue - cValue;
  addPvalue = addPvalue - pValue;
  addFvalue = addFvalue - fValue;

  if (addKvalue < 0) {
    kcalBar.style = `width: 0%`;
  } else {
    kcalBar.style = `width: ${addKvalue}%`;
    kcalBar.classList.add("bar-animate");
    setTimeout(() => {
      kcalBar.classList.remove("bar-animate");
    }, 1500);
  }
  if (addCvalue < 0) {
    cGraph.style = `--p:0`;
  } else {
    cGraph.style = `--p:${addCvalue}`;
  }
  if (addPvalue < 0) {
    pGraph.style = `--p:0`;
  } else {
    pGraph.style = `--p:${addPvalue}`;
  }
  if (addFvalue < 0) {
    fGraph.style = `--p:0`;
  } else {
    fGraph.style = `--p:${addFvalue}`;
  }

  let carbsValue = document.querySelector(".carbs-value");
  let proteinValue = document.querySelector(".protein-value");
  let fatValue = document.querySelector(".fat-value");

  if (addKvalue < 0) {
    kcalValue.innerText = "0%";
    addKvalue = 0;
  } else {
    kcalValue.innerText = `${addKvalue}%`;
  }
  if (addCvalue < 0) {
    carbsValue.innerText = "0%";
    addCvalue = 0;
  } else {
    carbsValue.innerText = `${addCvalue}%`;
    cGraph.classList.add("cAnimation");
  }
  if (addPvalue < 0) {
    proteinValue.innerText = "0%";
    addPvalue = 0;
  } else {
    proteinValue.innerText = `${addPvalue}%`;
    pGraph.classList.add("pAnimation");
  }
  if (addFvalue < 0) {
    fatValue.innerText = "0%";
    addFvalue = 0;
  } else {
    fatValue.innerText = `${addFvalue}%`;
    fGraph.classList.add("fAnimation");
  }

  const BKeyFrames = document.createElement("style");
  BKeyFrames.innerHTML = `@keyframes bar{
    from {
      width: ${addKvalue + kcalPercent}%;
    }
  }`;

  const CkeyFrames = document.createElement("style");
  CkeyFrames.innerHTML = `@keyframes cAnimation {
    from{--p:${addCvalue + cValue}}
  }`;
  const FkeyFrames = document.createElement("style");
  FkeyFrames.innerHTML = `@keyframes fAnimation {
    from{--p:${addFvalue + fValue}}
  }`;
  const PkeyFrames = document.createElement("style");
  PkeyFrames.innerHTML = `@keyframes pAnimation {
    from{--p:${addPvalue + pValue}}
  }`;

  kcalBar.appendChild(BKeyFrames);
  cGraph.appendChild(CkeyFrames);
  pGraph.appendChild(PkeyFrames);
  fGraph.appendChild(FkeyFrames);

  setTimeout(() => {
    cGraph.classList.remove("cAnimation");
    pGraph.classList.remove("pAnimation");
    fGraph.classList.remove("fAnimation");
  }, 1500);
}
