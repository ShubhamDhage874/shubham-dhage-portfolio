const text = [
  "Cyber Security Enthusiast",
  "Aspiring Security Analyst",
  "Networking Learner",
  "BCA Student"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let deleting = false;

function typeEffect() {

  currentText = text[count];

  if (!deleting) {
    letter = currentText.substring(0, index++);
  } else {
    letter = currentText.substring(0, index--);
  }

  document.getElementById("typing").textContent = letter;

  let speed = deleting ? 50 : 100;

  if (!deleting && letter.length === currentText.length) {
    speed = 1500;
    deleting = true;
  }

  if (deleting && letter.length === 0) {
    deleting = false;
    count++;

    if (count >= text.length) {
      count = 0;
    }
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});