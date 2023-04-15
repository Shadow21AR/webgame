//Listener for start button
const startButton = document.getElementById("start-button")
startButton.addEventListener("click", () => {
    isGameRunning = true;
    player.style.opacity = 1;

    const controlButtons = controlsDiv.querySelectorAll("button");
    controlButtons.forEach((button) => {
        button.style.display = "none";
    });
    canvas.style.display = "block";
    generateBackground(canvas, ctx);
    player.style.left = canvas.width / 2;
    player.style.top = canvas.height / 2;
    document.body.style.backgroundColor = "black";
});

//Listener for setting button
settingsButton.addEventListener("click", () => {
    startButton.remove();
    settingsButton.remove();

    // Create new control buttons
    const playerColorButton = document.createElement("button");
    playerColorButton.innerText = `Player Color`;
    playerColorButton.style.color = playerFill;
    controlsDiv.appendChild(playerColorButton);

    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.style.color = 'white';
    controlsDiv.appendChild(backButton);

    // Button listeners
    backButton.addEventListener("click", () => {
        // Remove the control buttons and back button
        const controlButtons = controlsDiv.querySelectorAll("button");
        controlButtons.forEach((button) => {
            button.style.display = "none";
        });

        controlsDiv.appendChild(startButton);
        controlsDiv.appendChild(settingsButton);
    });

    playerColorButton.addEventListener("click", () => {
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.addEventListener("input", () => {
            const newPlayerFill = colorPicker.value;
            player.style.fill = newPlayerFill;
            playerColorButton.style.color = newPlayerFill;
            localStorage.setItem('playerFill', newPlayerFill)
        });
        colorPicker.click();
    });
});

//Listener for control keypad when pressed
document.addEventListener("keydown", (event) => {
    if (!isGameRunning) {
        return;
    }
    pressedKeys.add(event.code);
    handleMovement();
});

//Listener for control keypad when released
document.addEventListener("keyup", (event) => {
    if (!isGameRunning) {
        return;
    }
    pressedKeys.delete(event.code);
    handleMovement();
});

// add touchstart event listener
document.addEventListener('touchstart', (event) => {
    if (!isGameRunning) {
        return
    }
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // Create joystick
    joystick = document.createElement('div');
    joystick.classList.add('joystick');
    joystick.style.left = x + 'px';
    joystick.style.top = y + 'px';

    // Create stick
    stick = document.createElement('div');
    stick.classList.add('stick');

    // Add stick to joystick
    joystick.appendChild(stick);

    // Add joystick to container
    joystickContainer.appendChild(joystick);
});

// add touchmove event listener
document.addEventListener('touchmove', (event) => {
    if (!isGameRunning) {
        return;
    }
    if (joystick) {
        moveStick(event);
    }
});

// add touchend event listener
document.addEventListener('touchend', () => {
    if (joystick) {
        joystick.remove();
        joystick = null;
    }
});

window.addEventListener('resize', () => {
    resizeCanvas(canvas, ctx, game, player);
});

window.addEventListener('load', () => {
    // code to run when the page loads or is refreshed
    init();
});
