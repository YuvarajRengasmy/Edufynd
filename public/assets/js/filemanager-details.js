(function () {
  "use strict";

  var lightboxVideo = GLightbox({
    selector: ".glightbox",
  });
  lightboxVideo.on("slide_changed", ({ prev, current }) => {
    console.log("Prev slide", prev);
    console.log("Current slide", current);

    const { slideIndex, slideNode, slideConfig, player } = current;
  });

  // for testimonials
  var swiper = new Swiper(".swiper-files", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      400: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      560: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  });
})();
