(function () {
  "use strict";

  var myElement1 = document.getElementById("users-tab-pane");
  new SimpleBar(myElement1, { autoHide: true });

  var myElement4 = document.getElementById("main-chat-content");
  new SimpleBar(myElement4, { autoHide: true });

  // for testimonials
  var swiper = new Swiper(".pagination-dynamic", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      400: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      560: {
        slidesPerView: 9,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 12,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
      1400: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      1600: {
        slidesPerView: 8,
        spaceBetween: 20,
      },
    },
  });

  document.querySelector(".responsive-chat-close").addEventListener("click", () => {
    document.querySelector(".main-chart-wrapper").classList.remove("responsive-chat-open")
  })
})();

let changeTheInfo = (element, name, img, status) => {
  document.querySelectorAll(".checkforactive").forEach((ele) => {
    ele.classList.remove("active");
  });
  element.closest("div").classList.add("active");
  document.querySelectorAll(".chatnameperson").forEach((ele) => {
    ele.innerText = name;
  });
  let image = `../assets/images/faces/${img}.jpg`;
  document.querySelectorAll(".chatimageperson").forEach((ele) => {
    ele.src = image;
  });
  document.querySelectorAll(".chatstatusperson").forEach((ele) => {
    ele.classList.remove("online");
    ele.classList.remove("offline");
    ele.classList.add(status);
  });

  document
    .querySelector(".main-chart-wrapper")
    .classList.add("responsive-chat-open");
};
