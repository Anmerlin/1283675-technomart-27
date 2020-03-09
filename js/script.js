var slideBtnNext = document.querySelector(".tizers-slider-wrapper .arrow-next");
var slideBtnPrev = document.querySelector(".tizers-slider-wrapper .arrow-prev");
var slideDot = document.querySelectorAll(".slider-pagination .slider-dot");

var slideIndex = 1;
showSlides(slideIndex);

slideBtnNext.addEventListener("click", function (evt) {
  evt.preventDefault();
  nextSlide()
});

slideBtnPrev.addEventListener("click", function (evt) {
  evt.preventDefault();
  prevSlide()
});

slideDot.forEach(function (dot) {
  dot.addEventListener("click", function (evt) {
    evt.preventDefault();
    currentSlide(+dot.innerHTML);
  });
});

function nextSlide() {
  showSlides(slideIndex += 1);
}

function prevSlide() {
  showSlides(slideIndex -= 1);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.querySelectorAll(".tizers-slide");
  var dots = document.querySelectorAll(".slider-pagination .slider-dot");

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " dot-active";
}


var slideBtnControl = document.querySelectorAll(".services-slider-control input");
var slideBlock = document.querySelectorAll(".services-slide");

slideBtnControl.forEach(function (btn) {
  btn.addEventListener("change", function (evt) {
    evt.preventDefault();
    var dataControlName = btn.dataset.controlName;
    serviceContent(dataControlName);
  });
});

function serviceContent(name) {
  slideBlock.forEach(function (block) {
    if (block.classList.contains("slide-" + name)) {
      block.classList.add("active");
    } else {
      block.classList.remove("active");
    }
  });
}

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
