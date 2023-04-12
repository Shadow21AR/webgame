const player = document.querySelector("#player");
const playerRect = player.getBoundingClientRect();
const startButton = document.querySelector("#start-game");
const game = document.querySelector("#game");
const trail = document.querySelector(".trail");
const gameRect = game.getBoundingClientRect();

player.style.visibility = "hidden";

let gameState = "stopped";
let position = { x: 0, y: 0 };
let speed = 5;
let startTime = null;

startButton.addEventListener("click", () => {
  gameState = "running";
  player.style.visibility = "visible";
  startButton.style.visibility = "hidden";
  game.style.display = "flex";
  player.style.top = playerRect.top + "px";
  player.style.left = playerRect.left + "px";
});

// Add an event listener to the document for keydown events
document.addEventListener("keydown", (event) => {
  if (gameState === "stopped") {
    return
  }
  if (startTime === null) startTime = Date.now();

  let elapsedTime = Date.now() - startTime;
  
  speed = elapsedTime <= 500 ? 10 :
          elapsedTime <= 1000 ? 20 :
          elapsedTime <= 1500 ? 30 :
          elapsedTime <= 2000 ? 40 : 50;

  if (event.key === "ArrowUp") {
    movePlayer(0, -speed);
  } else if (event.key === "ArrowDown") {
    movePlayer(0, speed);
  } else if (event.key === "ArrowLeft") {
    movePlayer(-speed, 0);
  } else if (event.key === "ArrowRight") {
    movePlayer(speed, 0);
  }
});


// Add an event listener to the document for keyup events
document.addEventListener("keyup", (event) => {
  if (gameState === "stopped") {
    return
  }
  speed = 5;
  startTime = null;
});

// Define a function to move the player
function movePlayer(dx, dy) {
  const playerRect = player.getBoundingClientRect();
  // Calculate the new position of the player
  const newTop = playerRect.top + dy;
  const newLeft = playerRect.left + dx;

  // Check if the new position is within the bounds of the game
  if (
    newTop >= 0 && newTop <= gameRect.height - playerRect.height &&
    newLeft >= 0 && newLeft <= gameRect.width - playerRect.width
  ) {
    // Set the new position of the player
    player.style.top = newTop + "px";
    player.style.left = newLeft + "px";

    // Create copies of the dot and add them to the trail
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.top = player.style.top;
    dot.style.left = player.style.left;
    dot.style.height = player.style.height;
    dot.style.width = player.style.width;
    dot.addEventListener("transitionend", () => {
      trail.removeChild(dot);
    });
    trail.appendChild(dot);
    setTimeout(() => {
      dot.style.opacity = 0;
    }, 2);
  }
}

