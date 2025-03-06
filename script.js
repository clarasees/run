// CONST 3 bg color references: start, middle, end
const colorRed = { r: 255, g: 0, b: 0 };     // Start: Red
const colorGreen = { r: 255, g: 30, b: 0  };     // Middle: Green
const colorBlue = { r: 40, g: 0, b: 255 };      // End: Blue

const cards = document.querySelectorAll(".card");

// CONST to reveal cards
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 1,
  }
);

//CHATGPT 
// Function to interpolate between two colors
function interpolateColor(color1, color2, factor) {
  const r = Math.round(color1.r + (color2.r - color1.r) * factor);
  const g = Math.round(color1.g + (color2.g - color1.g) * factor);
  const b = Math.round(color1.b + (color2.b - color1.b) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}


// infinite scrolling (reversed via ChatGPT)
const firstCardObserver = new IntersectionObserver(
  (entries) => {
    const firstCard = entries[0];
    if (!firstCard.isIntersecting) return;

    // Save current scroll position before adding new cards
    const previousHeight = document.body.scrollHeight;

    loadNewCards();

    // Adjust scroll position to keep the viewport stable
    window.scrollTo(0, window.scrollY + (document.body.scrollHeight - previousHeight));

    firstCardObserver.unobserve(firstCard.target);
    firstCardObserver.observe(document.querySelector(".card:first-child"));
  },
  {}
);

// Observe initial first card
firstCardObserver.observe(document.querySelector(".card:first-child"));

// Observe initial cards
cards.forEach((card) => {
  observer.observe(card);
});

const cardContainer = document.querySelector(".card-container");

// Function to load new cards (Prepend instead of Append)
function loadNewCards() {
  for (let i = 0; i < 50; i++) {
    const card = document.createElement("div");
    card.textContent = "New Step";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.prepend(card); // Add at the top instead of bottom
  }
}

window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate how far the card has moved up
    let progress = Math.min(Math.max((viewportHeight - rect.top) / viewportHeight, 0), 1);

    // Line width shrinks from 80% (bottom) to 20% (top)
    let newWidth = 80 - progress * 60;

    card.style.width = `${newWidth}%`;

    // CHANGE COLOR BACKGROUND
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      let progress = Math.min(Math.max((viewportHeight - rect.top) / viewportHeight, 0), 1);
      let newWidth = 80 - progress * 60;
      card.style.width = `${newWidth}%`;
    });

    // Calculate scroll percentage (0 at top, 1 at bottom)
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    let newColor;

    // Determine which segment of the color transition we're in
    if (scrollPercent <= 0.5) {
      // From Red to Green
      const t = scrollPercent / 0.5; // Normalize between 0 and 1
      newColor = interpolateColor(colorRed, colorGreen, t);
    } else {
      // From Green to Blue
      const t = (scrollPercent - 0.5) / 0.5; // Normalize between 0 and 1
      newColor = interpolateColor(colorGreen, colorBlue, t);
    }

    // Apply the new background color
    document.body.style.backgroundColor = newColor;
  });
});



const circle = document.querySelector(".circle-progress");
let isExpanded = false;

setInterval(() => {
  isExpanded = !isExpanded; // Toggle state
  circle.classList.toggle("expand", isExpanded);
}, 4000);


// speed display
let totalPixelsScrolled = 0;
window.addEventListener('wheel', (e) => {
  console.log(totalPixelsScrolled);
  totalPixelsScrolled = totalPixelsScrolled + - e.deltaY
  console.log(totalPixelsScrolled + "km/hr");

  let distanceTracker = document.querySelector
  distanceTracker.innerHTML = Math.round
  ('#distance-tracker');
  (totalPixelsScrolled/secondsPassed) + "km/hr";
})

let secondsPassed = 0;
setInterval(() => {
  secondsPassed = secondsPassed + 60;
  
  let distanceTracker = document.querySelector
  ('#distance-tracker');
  distanceTracker.innerHTML = Math.round(totalPixelsScrolled/secondsPassed) + "km/hr";
}, 1000)

window.onload = function () {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100); // Delay slightly to ensure DOM updates
};