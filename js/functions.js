//define how keypress handles the movement
function handleMovement() {
    let speed = 20;
    let directionX = 0;
    let directionY = 0;

    if (pressedKeys.has("ArrowLeft") || pressedKeys.has("KeyA")) {
        directionX = -1;
    }
    if (pressedKeys.has("ArrowRight") || pressedKeys.has("KeyD")) {
        directionX = 1;
    }
    if (pressedKeys.has("ArrowUp") || pressedKeys.has("KeyW")) {
        directionY = -1;
    }
    if (pressedKeys.has("ArrowDown") || pressedKeys.has("KeyS")) {
        directionY = 1;
    }

    // normalize diagonal movement speed
    if (directionX !== 0 && directionY !== 0) {
        speed /= Math.sqrt(2);
    }

    movePlayer(speed * directionX, speed * directionY);
}
// function to move the stick based on touch position
function moveStick(event) {
    const rect = joystick.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;
    const touchY = event.touches[0].clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distance = Math.sqrt((touchX - centerX) ** 2 + (touchY - centerY) ** 2);
    let stickX, stickY;

    // limit the distance to the maximum distance
    if (distance > maxDistance) {
        const angle = Math.atan2(touchY - centerY, touchX - centerX);
        stickX = Math.cos(angle) * maxDistance;
        stickY = Math.sin(angle) * maxDistance;
    } else {
        stickX = touchX - centerX;
        stickY = touchY - centerY;
    }

    // move the stick
    stick.style.transform = `translate(${stickX}px, ${stickY}px)`;

    // calculate the direction and move the player
    const speed = 10;
    const directionX = stickX / maxDistance;
    const directionY = stickY / maxDistance;
    movePlayer(speed * directionX, speed * directionY);
}

function movePlayer(dx, dy) {
    const playerRect = player.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();

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
        dot.style.backgroundColor = player.style.fill;
        dot.addEventListener("transitionend", () => {
            trail.removeChild(dot);
        });
        trail.appendChild(dot);
        setTimeout(() => {
            dot.style.opacity = 0;
        }, 2);
    }
}

function generateBackground(canvas, ctx) {
    // Set the canvas size to the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < numStars; i++) {
        // Define a random position for the star
        const x = Math.random() * ctx.canvas.width;
        const y = Math.random() * ctx.canvas.height;

        // Define a random size for the star
        const size = Math.random() * (maxSize - minSize) + minSize;

        // Define a random color for the star
        const r = Math.floor(Math.random() * (maxColorValue - minColorValue)) + minColorValue;
        const g = Math.floor(Math.random() * (maxColorValue - minColorValue)) + minColorValue;
        const b = Math.floor(Math.random() * (maxColorValue - minColorValue)) + minColorValue;
        const color = `rgb(${r}, ${g}, ${b})`;

        //random velocity
        const velocity = {
            x: (Math.random() - 0.5) * Math.random() * 2,
            y: (Math.random() - 0.5) * Math.random() * 2,
        }
        // Add the star to the array
        stars.push({ x, y, size, color, velocity });
    }
    stars.forEach(star => {
        const div = document.createElement('div');
        div.classList.add('star');
        div.style.top = star.y + 'px';
        div.style.left = star.x + 'px';
        div.style.width = star.size + 'px';
        div.style.height = star.size + 'px';
        div.style.backgroundColor = star.color;
        div.setAttribute("data-velocity", JSON.stringify(star.velocity));
        document.body.appendChild(div);
    });

    bgImg = canvas.toDataURL();
}

function checkCollision(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    if (
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top &&
        rect1.left < rect2.right &&
        rect1.right > rect2.left
    ) {
        return true;
    }
    return false;
}

function updateStars() {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const stars = document.getElementsByClassName("star");
    const playerRect = player.getBoundingClientRect();

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const starRect = star.getBoundingClientRect();
        const velocity = JSON.parse(star.getAttribute("data-velocity"));

        // Update position
        const newLeft = starRect.left + velocity.x;
        const newTop = starRect.top + velocity.y;
        star.style.left = newLeft + "px";
        star.style.top = newTop + "px";

        // Check collision with player
        if (checkCollision(player, star)) {
            // Change star velocity
            star.setAttribute("data-velocity", JSON.stringify({
                x: Math.random() * 1.5,
                y: Math.random() * 1.5
            }));
        }

        // Check collision with other stars
        for (let j = 0; j < stars.length; j++) {
            if (i !== j) {
                const otherStar = stars[j];
                if (checkCollision(star, otherStar)) {
                    // Change star velocity
                    star.setAttribute("data-velocity", JSON.stringify({
                        x: Math.random() * 1.5,
                        y: Math.random() * 1.5
                    }));
                }
            }
        }

        // Check if star is out of bounds
        if (
            newLeft < -starRect.width ||
            newLeft > canvasWidth ||
            newTop < -starRect.height ||
            newTop > canvasHeight
        ) {
            // Respawn star randomly near player
            const x = Math.floor(
                Math.random() * (playerRect.width + canvasWidth) - playerRect.width
            );
            const y = Math.floor(
                Math.random() * (playerRect.height + canvasHeight) - playerRect.height
            );
            star.style.left = playerRect.left + x + "px";
            star.style.top = playerRect.top + y + "px";
            star.setAttribute("data-velocity", JSON.stringify({
                x: Math.random() * 1.5,
                y: Math.random() * 1.5
            }));
        }
    }
    requestAnimationFrame(updateStars);
}
updateStars();

function resizeCanvas(canvas, ctx, game, player) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;

    tempCtx.drawImage(canvas, 0, 0);

    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;
    ctx.drawImage(tempCanvas, 0, 0);

    // Redraw the background
    reDrawBG(bgImg, ctx);

    game.style.width = canvas.width + "px";
    game.style.height = canvas.height + "px";

    player.style.left = canvas.width / 2;
    player.style.top = canvas.height / 2;
}

function reDrawBG(bgImg, ctx) {
    // Create a new image object and set the src to the stored data URL
    const img = new Image();
    img.src = bgImg;

    // Once the image has loaded, draw it to the canvas
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function init() {
    playerFill = localStorage.getItem('playerFill') || window.getComputedStyle(player).getPropertyValue('fill');
    player.style.fill = playerFill;
}