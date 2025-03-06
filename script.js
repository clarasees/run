const cards = document.querySelectorAll(".card")

// observer for revealing cards
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting)
      if(entry.isIntersecting) observer.unobserve(entry.target)
    })
  },
  {
  threshold: 1,
  }
)

// observer for infinite scrolling
const lastCardObsever = new IntersectionObserver(entries => {
  const lastCard = entries[0]
  if (!lastCard.isIntersecting) return
  loadNewCards()
  lastCardObsever.unobserve(lastCard.target)
lastCardObsever.observe(document.querySelector(".card:last-child"))
}, {})

// observe initial last card
lastCardObsever.observe(document.querySelector(".card:last-child"))

// observe initial cards
cards.forEach(card => {
  observer.observe(card)
})

const cardContainer = document.querySelector(".card-container")

// function to load new cards
function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div")
    card.textContent = "New Step"
    card.classList.add("card")
    observer.observe(card)
    cardContainer.append(card)
  }
}

window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate how far the card has moved up
    let progress = Math.min(Math.max((viewportHeight - rect.top) / viewportHeight, 0), 1);

    // Line width shrinks from 80% (bottom) to 20% (top)
    let newWidth = 80 - progress * 60; 

    card.style.width = `${newWidth}%`;
  });
});

const circle = document.querySelector('.circle-progress');
let isExpanded = false;

setInterval(() => {
  isExpanded = !isExpanded; // Toggle state
  circle.classList.toggle('expand', isExpanded);
}, 4000);
