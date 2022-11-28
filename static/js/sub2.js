function Search() {
  let result = document.forms["search"].searchInput.value;
  console.log(result);
  const search = document.querySelector(".search");

  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v2/search/blog?target=title",
    data: {
      query: result,
    },
    // data: { query: result },
    // data: { query: '건강' },
    headers: {
      Authorization: "KakaoAK a781e81dc26fc9d9edf0b4cb02c30760",
    },
  }).done(function (msg) {
    console.log(msg);

    let html = "";
    for (i = 0; i < msg.documents.length; i++) {
      html += `
        <a href="${msg.documents[i].url}">
          <div class="news">
            <p>NO&#46;&nbsp;<span>${[i]}</span></p>
            <h4>${msg.documents[i].title}</h4>
            <p>${msg.documents[i].blogname}</p>
            <p>${msg.documents[i].contents.substr(0, 100)}...</p>
            <p>${msg.documents[i].datetime}</p>
          </div>
          <img src="/static/img/search${i}.jpg" alt="건강정보이미지">
        </a>
      `;
    }
    search.insertAdjacentHTML("afterbegin", html);
    // search.innerHTML.replace(/<(\/b|b)([^>]*)>/gi,"");
    // html.replace(/<(\/b|b)([^>]*)>/gi,"");
  });
}

const form = document.forms["search"];
window.onload = (event) => {
  event.preventDefault();
  let result = document.forms["search"].searchInput.value;
  console.log(result);
  const search = document.querySelector(".search");

  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v2/search/blog?target=title",
    data: {
      query: '건강',
    },
    // data: { query: `${result}` },
    // data: { query: '건강' },
    headers: {
      Authorization: "KakaoAK a781e81dc26fc9d9edf0b4cb02c30760",
    },
  }).done(function (msg) {
    console.log(msg);

    let html = "";
    for (i = 0; i < msg.documents.length; i++) {
      html += `
                    <a href="${msg.documents[i].url}">
                      <div class="news">
                        <p>NO&#46;&nbsp;<span>${[i]}</span></p>
                        <h4>${msg.documents[i].title}</h4>
                        <p>${msg.documents[i].blogname}</p>
                        <p>${msg.documents[i].contents.substr(0, 100)}</p>
                        <p>${msg.documents[i].datetime}</p>
                      </div>
                      <img src="/static/img/search${i}.jpg" alt="건강정보이미지">
                      </a>
                  `;
    }
    search.insertAdjacentHTML("afterbegin", html);
    // search.innerHTML.replace(/<(\/b|b)([^>]*)>/gi,"");
    // html.replace(/<(\/b|b)([^>]*)>/gi,"");

  })
};
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let result = document.forms["search"].searchInput.value;
  console.log(result);
  const search = document.querySelector(".search");

  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v2/search/blog?target=title",
    data: {
      query: result
    },
    // data: { query: `${result}` },
    // data: { query: '건강' },
    headers: {
      Authorization: "KakaoAK a781e81dc26fc9d9edf0b4cb02c30760",
    },
  }).done(function (msg) {
    console.log(msg);

    let html = "";
    for (i = 0; i < msg.documents.length; i++) {
      html += `
                    <a href="${msg.documents[i].url}">
                      <div class="news">
                        <p>NO&#46;&nbsp;<span>${[i]}</span></p>
                        <h4>${msg.documents[i].title}</h4>
                        <p>${msg.documents[i].blogname}</p>
                        <p>${msg.documents[i].contents.substr(0, 100)}</p>
                        <p>${msg.documents[i].datetime}</p>
                      </div>
                      <img src="/static/img/search${i}.jpg" alt="건강정보이미지">
                    </a>
                  `;
    }
    search.insertAdjacentHTML("afterbegin", html);
    // search.innerHTML.replace(/<(\/b|b)([^>]*)>/gi,"");
    // html.replace(/<(\/b|b)([^>]*)>/gi,"");
  });
});