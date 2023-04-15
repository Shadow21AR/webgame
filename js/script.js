// // Get player
// const player = document.querySelector("#player");
// const playerRect = player.getBoundingClientRect();
// const trail = document.querySelector(".trail");

// // Get div
// const game = document.querySelector("#game");
// const gameRect = game.getBoundingClientRect();

// const controlsDiv = document.getElementById("controls");

// // Get button
// const startButton = document.querySelector("#start-button");
// const settingsButton = document.querySelector("#settings");

// // Get background
// const canvas = document.getElementById("background");
// const ctx = canvas.getContext("2d");

// //vars?
// let position = { x: 0, y: 0 };
// let speed = 5;
// let startTime = null;
// let stars = [];

// let gameState, playerFill;

// //init
// init();
// function init() {
//   // Initialize game state
//   gameState = false;
//   player.style.opacity = "0";

//   playerFill = localStorage.getItem('playerFill') || window.getComputedStyle(player).getPropertyValue('fill');
//   player.style.fill = playerFill;
// }

// // Add an event listener to the document for startbutton
// startButton.addEventListener("click", () => {
//   gameState = true;
//   player.style.opacity = 1;

//   const controlButtons = controlsDiv.querySelectorAll("button");
//   controlButtons.forEach((button) => {
//     button.style.display = "none";
//   });
//   canvas.width = window.innerWidth * 2;
//   canvas.height = window.innerHeight * 2;

//   for (let i = 0; i < 500; i++) {
//     const x = Math.random() * canvas.width;
//     const y = Math.random() * canvas.height;
//     const size = Math.random() * 3;
//     ctx.beginPath();
//     ctx.fillStyle = "#ffffff";
//     ctx.arc(x, y, size, 0, 2 * Math.PI);
//     ctx.fill();
//   }
//   canvas.style.display = "block";
// });

// // Add click event listener to the settings button
// settingsButton.addEventListener("click", () => {
//   startButton.remove();
//   settingsButton.remove();

//   // Create new control buttons
//   const playerColorButton = document.createElement("button");
//   playerColorButton.innerText = `Player Color`;
//   playerColorButton.style.color = playerFill;
//   controlsDiv.appendChild(playerColorButton);

//   const backButton = document.createElement("button");
//   backButton.innerText = "Back";
//   backButton.style.color = 'white';
//   controlsDiv.appendChild(backButton);

//   // Button listeners
//   backButton.addEventListener("click", () => {
//     // Remove the control buttons and back button
//     const controlButtons = controlsDiv.querySelectorAll("button");
//     controlButtons.forEach((button) => {
//       button.style.display = "none";
//     });

//     controlsDiv.appendChild(startButton);
//     controlsDiv.appendChild(settingsButton);
//   });

//   playerColorButton.addEventListener("click", () => {
//     const colorPicker = document.createElement("input");
//     colorPicker.type = "color";
//     colorPicker.addEventListener("input", () => {
//       const newPlayerFill = colorPicker.value;
//       player.style.fill = newPlayerFill;
//       playerColorButton.style.color = newPlayerFill;
//       localStorage.setItem('playerFill', newPlayerFill)
//     });
//     colorPicker.click();
//   });
// });

// // Add an event listener to the document for keydown events
// const pressedKeys = new Set();

// document.addEventListener("keydown", (event) => {
//   if (!gameState) {
//     return;
//   }
//   pressedKeys.add(event.code);
//   handleMovement();
// });

// document.addEventListener("keyup", (event) => {
//   pressedKeys.delete(event.code);
//   handleMovement();
// });

// function handleMovement() {
//   let speed = 20;
//   let directionX = 0;
//   let directionY = 0;

//   if (pressedKeys.has("ArrowLeft") || pressedKeys.has("KeyA")) {
//     directionX = -1;
//   }
//   if (pressedKeys.has("ArrowRight") || pressedKeys.has("KeyD")) {
//     directionX = 1;
//   }
//   if (pressedKeys.has("ArrowUp") || pressedKeys.has("KeyW")) {
//     directionY = -1;
//   }
//   if (pressedKeys.has("ArrowDown") || pressedKeys.has("KeyS")) {
//     directionY = 1;
//   }

//   // normalize diagonal movement speed
//   if (directionX !== 0 && directionY !== 0) {
//     speed /= Math.sqrt(2);
//   }

//   movePlayer(speed * directionX, speed * directionY);
// }

// // Add an event listener to the document for keyup events
// document.addEventListener("keyup", (event) => {
//   speed = 5;
//   startTime = null;
// });

// // Define a function to move the player
// function movePlayer(dx, dy) {
//   const playerRect = player.getBoundingClientRect();
//   // Calculate the new position of the player
//   const newTop = playerRect.top + dy;
//   const newLeft = playerRect.left + dx;

//   // Check if the new position is within the bounds of the game
//   if (
//     newTop >= 0 && newTop <= gameRect.height - playerRect.height &&
//     newLeft >= 0 && newLeft <= gameRect.width - playerRect.width
//   ) {
//     // Set the new position of the player
//     player.style.top = newTop + "px";
//     player.style.left = newLeft + "px";

//     // Create copies of the dot and add them to the trail
//     const dot = document.createElement("div");
//     dot.classList.add("dot");
//     dot.style.top = player.style.top;
//     dot.style.left = player.style.left;
//     dot.style.height = player.style.height;
//     dot.style.width = player.style.width;
//     dot.style.backgroundColor = player.style.fill;
//     dot.addEventListener("transitionend", () => {
//       trail.removeChild(dot);
//     });
//     trail.appendChild(dot);
//     setTimeout(() => {
//       dot.style.opacity = 0;
//     }, 2);
//   }
// }

// //touch support??
// const joystickContainer = document.getElementById('joystick-container');
// let joystick = null;

// const maxDistance = 40; // maximum distance the stick can move
// let stick;

// // add touchstart event listener
// document.addEventListener('touchstart', (event) => {
//   if (!gameState) {
//     return
//   }
//   const touch = event.touches[0];
//   const x = touch.clientX;
//   const y = touch.clientY;

//   // Create joystick
//   joystick = document.createElement('div');
//   joystick.classList.add('joystick');
//   joystick.style.left = x + 'px';
//   joystick.style.top = y + 'px';

//   // Create stick
//   stick = document.createElement('div');
//   stick.classList.add('stick');

//   // Add stick to joystick
//   joystick.appendChild(stick);

//   // Add joystick to container
//   joystickContainer.appendChild(joystick);
// });

// // add touchmove event listener
// document.addEventListener('touchmove', (event) => {
//   if (joystick) {
//     moveStick(event);
//   }
// });

// // add touchend event listener
// document.addEventListener('touchend', () => {
//   if (joystick) {
//     joystick.remove();
//     joystick = null;
//   }
// });

// // function to move the stick based on touch position
// function moveStick(event) {
//   const rect = joystick.getBoundingClientRect();
//   const touchX = event.touches[0].clientX - rect.left;
//   const touchY = event.touches[0].clientY - rect.top;
//   const centerX = rect.width / 2;
//   const centerY = rect.height / 2;
//   const distance = Math.sqrt((touchX - centerX) ** 2 + (touchY - centerY) ** 2);
//   let stickX, stickY;

//   // limit the distance to the maximum distance
//   if (distance > maxDistance) {
//     const angle = Math.atan2(touchY - centerY, touchX - centerX);
//     stickX = Math.cos(angle) * maxDistance;
//     stickY = Math.sin(angle) * maxDistance;
//   } else {
//     stickX = touchX - centerX;
//     stickY = touchY - centerY;
//   }

//   // move the stick
//   stick.style.transform = `translate(${stickX}px, ${stickY}px)`;

//   // calculate the direction and move the player
//   const speed = 10;
//   const directionX = stickX / maxDistance;
//   const directionY = stickY / maxDistance;
//   movePlayer(speed * directionX, speed * directionY);
// }