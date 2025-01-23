// head content animation
document.querySelectorAll('.animated-section').forEach((element) => {
  const randomX = `${Math.random() * 100 - 50}px`;
  const randomY = `${Math.random() * 100 - 50}px`;
  
  element.style.setProperty('--random-x', randomX);
  element.style.setProperty('--random-y', randomY);
  
  element.style.animationDelay = `${Math.random() * 0.5}s`;
});

// our service animation
window.addEventListener("load", () => {
  const elements = document.querySelectorAll(".card__article");

  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
    element.style.animation = "fade-in-step 2s ease-in-out forwards";
  });
});

// details service animation

