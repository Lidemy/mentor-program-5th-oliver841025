const TOP_GAMES_URL = "https://api.twitch.tv/kraken/games/top?limit=5";
const GAMES_STREAMS_URL = "https://api.twitch.tv/kraken/streams?game=";
const HEADERS = {
  headers: {
    Accept: "application / vnd.twitchtv.v5 + json",
    "Client-ID": "cf2rjdklgkbltczqmcirnljp09ykz5",
  },
};

// 檢視是否首次來到頁面
let isFirstVisit = true;

// top 5 games 放到 navbar 上
function addStreamsToNavbar(data, gameName) {
  const games = data.top;

  for (let game of games) {
    let element = document.createElement("li");
    element.innerText = game.game.name;
    document.querySelector(".navbar__list").appendChild(element);
  }
  if (!document.querySelector(".wrapper h3").innerText) {
    document.querySelector(".wrapper h3").innerText = games[0].game.name;
    // getGamesStreams(games[0].game.name);
  } else {
    document.querySelector(".wrapper h3").innerText = gameName;
  }
}

// 首次來到頁面，需要先秀出 top 5 games 的圖
function addStreamsToContent(data) {
  for (let stream of data.streams) {
    let element = document.createElement("div");
    document.querySelector(".live-game__block").appendChild(element);
    element.outerHTML = `
              <div class="stream">
            <img
              src="${stream.preview.large}"
            />
            <div class="stream__data">
              <div class="stream__avatar">
                <img
                  src="${stream.channel.logo}"
                />
              </div>
              <div class="stream__intro">
                <div class="stream__title">${stream.channel.status}</div>
                <div class="stream__channel">${stream.channel.name}</div>
              </div>
            </div>
          </div>
            `;
  }
}

function addTopGamesStreamsToContent(data) {
  data.top.forEach((stream) => {
    let element = document.createElement("div");
    document.querySelector(".live-game__block").appendChild(element);
    element.outerHTML = `
              <div class="stream">
            <img
              src="${stream.game.box.large}"
            />
            <div class="stream__data">
              <div class="stream__intro">
                <div class="stream__channel">${stream.game.name}</div>
              </div>
            </div>
          </div>
            `;
  });
}

// 有了 Promise 就不會有 callback，除非用的 library 不支援
async function getGameStreamsAPI() {
  const response = await fetch(TOP_GAMES_URL, HEADERS);
  const data = await response.json();
  return data;
}

async function renderStreams(gameName) {
  try {
    await getGameStreamsAPI().then((data) => {
      addStreamsToNavbar(data, gameName);
      if (isFirstVisit === true) {
        addTopGamesStreamsToContent(data);
      }
      isFirstVisit = false;
    });
  } catch (err) {
    console.log(err);
  }
}

async function getGameStreamsAPIOnlyNine(gameName) {
  const response = await fetch(
    GAMES_STREAMS_URL + encodeURIComponent(gameName) + "&limit=9",
    HEADERS
  );
  const data = response.json();
  return data;
}

async function renderStreamsOnlyNine(gameName) {
  try {
    await getGameStreamsAPIOnlyNine(gameName).then((data) => {
      addStreamsToContent(data);
    });
  } catch {
    (err) => console.log(err);
  }
}

// 點擊選單切換 streams
document.querySelector(".navbar__list").addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    const gameName = e.target.innerText;
    document.querySelector(".wrapper h3").innerText = gameName;
    document.querySelector(".live-game__block").innerHTML = "";

    document.querySelector(".navbar__list").innerHTML = "";
    renderStreams(gameName);
    renderStreamsOnlyNine(gameName);
  }
});
renderStreams();
