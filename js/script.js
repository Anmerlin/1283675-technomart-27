var slides = document.querySelectorAll(".tizers-slide");
var slideBtnNext = document.querySelector(".tizers-slider-wrapper .arrow-next");
var slideBtnPrev = document.querySelector(".tizers-slider-wrapper .arrow-prev");
var slideDot = document.querySelectorAll(".slider-pagination .slider-dot");

var slideIndex = 1;
if (slides.length) {
  showSlides(slideIndex);

  slideBtnNext.addEventListener("click", function (evt) {
    evt.preventDefault();
    nextSlide()
  });

  slideBtnPrev.addEventListener("click", function (evt) {
    evt.preventDefault();
    prevSlide()
  });

  for (var i = 0; i < slideDot.length; i++) {
    slideDot[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      currentSlide(+this.innerHTML);
    });
  }
}

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
  var dots = document.querySelectorAll(".slider-pagination .slider-dot");

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].className = slides[i].className.replace(" slide-show", "");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }
  slides[slideIndex - 1].className += " slide-show";
  dots[slideIndex - 1].className += " dot-active";
}


var slideBtnControl = document.querySelectorAll(".services-slider-control input");
var slideBlock = document.querySelectorAll(".services-slide");

for (var i = 0; i < slideBtnControl.length; i++) {
  slideBtnControl[i].addEventListener("change", function (evt) {
    evt.preventDefault();
    var dataControlName = this.dataset.controlName;
    serviceContent(dataControlName);
  });
};

function serviceContent(name) {
  for (var i = 0; i < slideBlock.length; i++) {
    if (slideBlock[i].classList.contains("slide-" + name)) {
      slideBlock[i].classList.add("active");
    } else {
      slideBlock[i].classList.remove("active");
    }
  };
}

var mapLink = document.querySelector(".map-link");
var feedbackBtn = document.querySelector(".button-write");
var basketBtn = document.querySelectorAll(".button-buy");
var continueBtn = document.querySelector(".button-modal-buy");

var map = document.querySelector(".modal-map");
var feedback = document.querySelector(".modal-feedback");
var basket = document.querySelector(".modal-basket");
var closeBtn = document.querySelectorAll(".modal-close");

if (feedback !== null) {
  var form = feedback.querySelector("form");
  var surname = feedback.querySelector("[name=surname]");
  var email = feedback.querySelector("[name=email]");
  var text = feedback.querySelector("[name=text]");
}

var isStorageSupport = true;
var storageSurname = "";
var storageEmail = "";

try {
  storageSurname = localStorage.getItem("surname");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

if (mapLink !== null) {
  mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    map.classList.add("modal-show");
  });
}

if (feedbackBtn !== null) {
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
}

for (var i = 0; i < basketBtn.length; i++) {
  basketBtn[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    basket.classList.add("modal-show");
  });
}

for (var i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    this.parentNode.classList.remove("modal-show");
    this.parentNode.classList.remove("modal-error");
  });
};

continueBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  basket.classList.remove("modal-show");
});

if (form !== undefined && form.length) {
  form.addEventListener("submit", function (evt) {
    if (!surname.value || !email.value) {
      evt.preventDefault();
      feedback.classList.remove("modal-error");
      feedback.offsetWidth = feedback.offsetWidth;
      feedback.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("surname", surname.value);
        localStorage.setItem("email", email.value);
      }
    }
  });
}

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (feedback.classList.contains("modal-show")) {
      feedback.classList.remove("modal-show");
      feedback.classList.remove("modal-error");
    }
  }
});
