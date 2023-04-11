// Select the player element
const player = document.querySelector("#player");

const playerRect = player.getBoundingClientRect();

player.style.top = playerRect.top + "px";
player.style.left = playerRect.left + "px";
player.style.visibility = "hidden";

let gameState = "stopped";

// Set the initial position of the player
let position = { x: 0, y: 0 };

// Set the initial speed and direction of the player
let speed = 0;
let direction = { x: 0, y: 0 };

// Set the maximum speed of the player
const maxSpeed = 50;

// Set the acceleration of the player
const acceleration = 0.8;

// Set the friction of the player
const friction = 0.3;

// Set the time the key was pressed
let startTime = null;

// Add an event listener to the document for keydown events
document.addEventListener("keydown", (event) => {
  if (gameState === "stopped") {
    return
  }
  if (startTime === null) {
    startTime = Date.now();
  }

  if (Date.now() - startTime > 500) {
    speed = 10;
  }

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
  // Calculate the new position of the player
  const playerRect = player.getBoundingClientRect();
  const gameRect = game.getBoundingClientRect();
  const trail = document.querySelector(".trail")

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
    trail.appendChild(dot);
    setTimeout(() => {
      dot.style.opacity = 0;
    }, 10);
    setTimeout(() => {
      trail.removeChild(dot);
    }, 500);

    playerRect.top = newTop;
    playerRect.left = newLeft;
  }
}

const startButton = document.querySelector("#start-game");
startButton.addEventListener("click", () => {
  // Set the game state to "running"
  gameState = "running";
  // Hide the "Start Game" button
  player.style.visibility = "visible";
  startButton.style.visibility = "hidden";
  // Show the game
  const game = document.querySelector("#game");
  game.style.display = "flex";
  // Set the initial position of the player
  const playerRect = player.getBoundingClientRect();
  player.style.top = playerRect.top + "px";
  player.style.left = playerRect.left + "px";
});