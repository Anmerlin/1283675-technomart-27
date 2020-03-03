var mapLink = document.querySelector(".map-link");
var feedbackBtn = document.querySelector(".button-write");
var basketBtn = document.querySelectorAll(".button-buy");

var map = document.querySelector(".modal-map");
var feedback = document.querySelector(".modal-feedback");
var basket = document.querySelector(".modal-basket");
var close = document.querySelectorAll(".modal-close");

var form = feedback.querySelector("form");
var surname = feedback.querySelector("[name=surname]");
var email = feedback.querySelector("[name=email]");
var text = feedback.querySelector("[name=text]");

var isStorageSupport = true;
var storageSurname = "";
var storageEmail = "";

try {
  storageSurname = localStorage.getItem("surname");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  map.classList.add("modal-show");
});

feedbackBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedback.classList.add("modal-show");

  if (storageSurname && storageEmail) {
    surname.value = storageSurname;
    email.value = storageEmail;
    text.focus();
  } else {
    surname.focus();
  }
});

basketBtn.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    evt.preventDefault();
    basket.classList.add("modal-show");
  });
});

close.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    evt.preventDefault();
    item.parentNode.classList.remove("modal-show");
  });
});

form.addEventListener("submit", function (evt) {
  if (!surname.value || !email.value) {
    evt.preventDefault();
    // error
  } else {
    if (isStorageSupport) {
      localStorage.setItem("surname", surname.value);
      localStorage.setItem("email", email.value);
    }
  }
});
