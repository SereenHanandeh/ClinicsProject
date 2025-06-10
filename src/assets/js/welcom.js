const colors = [
  "#ff3b3f",
  "#ffc107",
  "#28a745",
  "#007bff",
  "#6610f2",
  "#e83e8c",
];

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
  confetti.style.width = Math.random() * 8 + 5 + "px";
  confetti.style.height = confetti.style.width;
  confetti.style.borderRadius = "2px";
  document.body.appendChild(confetti);

  confetti.addEventListener("animationend", () => {
    confetti.remove();
  });
}

setInterval(createConfetti, 150);
