const popupOverlay = document.querySelector(".popup-overlay");
const skipButton = document.querySelector(".popup-container .skip-button");
const visitButton = document.querySelector(".popup-container .visit-button");

let remainingTime = 3;
let allowedToSkip = false;
let popupTimer;

const createPopupCookie = () => {
  let expiresDays = 30;
  let date = new Date();
  date.setTime(date.getTime() + expiresDays * 6 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `popupCookie=true; ${expires}; path=/;`;
};

const showAd = () => {
  popupOverlay.classList.add("active");
  popupTimer = setInterval(() => {
    skipButton.innerHTML = `Omitir en ${remainingTime}s`;
    remainingTime--;

    if (remainingTime < 0) {
      allowedToSkip = true;
      skipButton.innerHTML = "Omitir";
      clearInterval(popupTimer);
    }
  }, 1000);
};

const skipAd = () => {
  popupOverlay.classList.remove("active");
  createPopupCookie();
};

skipButton.addEventListener("click", () => {
  if (allowedToSkip) {
    skipAd();
  }
});

const startTimer = () => {
  if (window.scrollY > 100) {
    showAd();
    window.removeEventListener("scroll", startTimer);
  }
};

if (!document.cookie.match(/^(.*;)?\s*popupCookie\s*=\s*[^;]+(.*)?$/)) {
  window.addEventListener("scroll", startTimer);
}

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("abajo", window.scrollY > 0);
});