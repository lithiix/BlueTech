/* Background video with opacity */
window.onload = function () {
  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");

  function fadeOut(video, callback) {
    let opacity = 1;
    const fadeInterval = setInterval(() => {
      if (opacity <= 0) {
        clearInterval(fadeInterval);
        video.style.opacity = "0";
        video.style.zIndex = "0";
        if (callback) callback();
      } else {
        opacity -= 0.5;
        video.style.opacity = opacity;
      }
    }, 50);
  }

  function fadeIn(video) {
    let opacity = 0;
    video.style.zIndex = "1";
    video.style.opacity = "0";
    const fadeInterval = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(fadeInterval);
        video.style.opacity = "1";
      } else {
        opacity += 0.5;
        video.style.opacity = opacity;
      }
    }, 50);
  }

  function setupSeamlessTransition(video, nextVideo) {
    const fadeDuration = 500;
    const fadeStart = video.duration - fadeDuration / 1000;

    video.addEventListener("timeupdate", function () {
      if (video.currentTime >= fadeStart && !video.isFading) {
        video.isFading = true;
        fadeOut(video, () => {
          nextVideo.play();
          fadeIn(nextVideo);
          video.isFading = false;
        });
      }
    });
  }

  video1.style.position = "absolute";
  video1.style.opacity = "1";
  video1.style.zIndex = "1";

  video2.style.position = "absolute";
  video2.style.opacity = "0";
  video2.style.zIndex = "0";

  setupSeamlessTransition(video1, video2);
  setupSeamlessTransition(video2, video1);

  video1.play();
};

const hamburger = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('show');
});


/* Image scroll left to right 767px and below width devices */
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".card__container");
  const articles = document.querySelectorAll(".card__article");

  const enableAutoScroll = () => {
    if (window.innerWidth <= 768) {
      let scrollStep = scrollContainer.scrollWidth / articles.length;
      let scrollInterval = 5000;

      const intervalId = setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }, scrollInterval);

      scrollContainer.dataset.scrollIntervalId = intervalId;
    }
  };

  const disableAutoScroll = () => {
    const intervalId = scrollContainer.dataset.scrollIntervalId;
    if (intervalId) {
      clearInterval(intervalId);
      delete scrollContainer.dataset.scrollIntervalId;
    }
  };

  const showCardData = () => {
    if (window.innerWidth <= 768) {
      articles.forEach((article) => {
        const cardData = article.querySelector(".card__data");
        if (cardData) {
          cardData.style.opacity = "1";
          cardData.style.transform = "translate(-50%, -50%)";
        }
      });
    }
  };

  if (window.innerWidth <= 768) {
    enableAutoScroll();
    showCardData();
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      enableAutoScroll();
      showCardData();
    } else {
      disableAutoScroll();
    }
  });
});


/* Background image */
const allImages = document.querySelectorAll('.details_image img');
let currentIndex = 0;

function setRandomZoomOrigin(image) {
  const randomX = Math.random() * 60 + 20;
  const randomY = Math.random() * 60 + 20;
  image.style.transformOrigin = `${randomX}% ${randomY}%`;
}

function getRandomIndex(excludeIndex) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * allImages.length);
  } while (randomIndex === excludeIndex);
  return randomIndex;
}

function changeSlide() {
  const currentImage = allImages[currentIndex];
  currentImage.classList.remove('active'); // Remove active class

  currentIndex = getRandomIndex(currentIndex);
  const nextImage = allImages[currentIndex];

  setRandomZoomOrigin(nextImage);
  nextImage.classList.add('active');
}

setInterval(changeSlide, 5000);

let list = document.querySelectorAll('.details_content_right .details_item');

list.forEach(item => {
  item.addEventListener('click', function (event) {
    if(event.target.classList.contains('details_box')) {
      list.forEach(el => {
        if (el !== item) {
          el.classList.remove('active');
        }
      });

      item.classList.toggle('active');
    }
  });
});

/* Latest project image slider */
let slider = document.querySelector('.project-container .project-list');
let items = document.querySelectorAll('.project-container .project-list .project-item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.project-container .project-dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
}
prev.onclick = function(){
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
  slider.style.left = -items[active].offsetLeft + 'px'; 
  let last_active_dot = document.querySelector('.project-container .project-dots li.active');
  last_active_dot.classList.remove('active');
  dots[active].classList.add('active');

  clearInterval(refreshInterval);
  refreshInterval = setInterval(()=> {next.click()}, 3000);
}

dots.forEach((li, key) => {
  li.addEventListener('click', ()=>{
    active = key;
    reloadSlider();
  })
})
window.onresize = function(event) {
  reloadSlider();
};

/* Latest project mobile images */
document.addEventListener("DOMContentLoaded", function () {
  const mediaQuery = window.matchMedia("(max-width: 480px)");
  const projectItems = document.querySelectorAll(".project-item");

  function updateImagesForSmallScreens(e) {
    if (e.matches) {
      projectItems.forEach((item, index) => {
        const img = item.querySelector("img");
        switch (index) {
          case 0:
            img.src = "image/small-project/small-project-01.avif";
            break;
          case 1:
            img.src = "image/small-project/small-project-02.webp";
            break;
          case 2:
            img.src = "image/small-project/small-project-3.png";
            break;
          case 3:
            img.src = "image/small-project/small-project-4.jpg";
            break;
        }
      });
    } else {
      projectItems.forEach((item, index) => {
        const img = item.querySelector("img");
        switch (index) {
          case 0:
            img.src = "https://digitalnotebook.in/up/2023/06/Website-design.jpg";
            break;
          case 1:
            img.src = "image/project/project-1.jpg";
            break;
          case 2:
            img.src = "image/project/project-2.webp";
            break;
          case 3:
            img.src = "image/project/project-4.webp";
            break;
        }
      });
    }
  }

  mediaQuery.addEventListener("change", updateImagesForSmallScreens);
  updateImagesForSmallScreens(mediaQuery); // Initial check
});

/* our team members */
document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.querySelector(".card_Container");
  const cards = document.querySelectorAll(".card");

  const enableAutoScroll = () => {
    if (window.innerWidth <= 480) {
      let scrollInterval = 4000;
      const scrollStep = cardContainer.scrollWidth / cards.length;

      const intervalId = setInterval(() => {
        if (cardContainer.scrollLeft + cardContainer.clientWidth >= cardContainer.scrollWidth) {
          cardContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          cardContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }, scrollInterval);

      cardContainer.dataset.scrollIntervalId = intervalId;
    }
  };

  const disableAutoScroll = () => {
    const intervalId = cardContainer.dataset.scrollIntervalId;
    if (intervalId) {
      clearInterval(intervalId);
      delete cardContainer.dataset.scrollIntervalId;
    }
  };

  const showCardContent = () => {
    if (window.innerWidth <= 480) {
      cards.forEach((card) => {
        const content = card.querySelector(".content");
        if (content) {
          content.style.bottom = "0";
        }
      });
    }
  };

  if (window.innerWidth <= 480) {
    enableAutoScroll();
    showCardContent();
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 480) {
      enableAutoScroll();
      showCardContent();
    } else {
      disableAutoScroll();
    }
  });

  const applyHoverEffect = () => {
    if (window.innerWidth <= 768) {
      const cards = document.querySelectorAll(".card");

      cards.forEach((card) => {
        const imageBox = card.querySelector(".imbBx");
        const content = card.querySelector(".content");

        imageBox.addEventListener("click", () => {
          const isVisible = content.style.bottom === "0px";
          content.style.bottom = isVisible ? "-100px" : "0px";
        });
      });
    }
  };

  applyHoverEffect();

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      // Reset styles when resizing to larger devices
      const contents = document.querySelectorAll(".content");
      contents.forEach((content) => {
        content.style.bottom = "-100px";
      });
    } else {
      applyHoverEffect();
    }
  });
});

