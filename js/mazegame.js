// set the dimensions of the maze
const width = 20;
const height = 20;

// create a 2D array to represent the maze
const maze = new Array(height);
for (let i = 0; i < height; i++) {
    maze[i] = new Array(width).fill(0);
}

// recursive backtracking algorithm to generate the maze
const generateMaze = (x, y) => {
    maze[y][x] = 1;

    const directions = shuffleDirections();
    for (let i = 0; i < directions.length; i++) {
        const [dx, dy] = directions[i];
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < width && ny < height && maze[ny][nx] === 0) {
            maze[y + dy / 2][x + dx / 2] = 1;
            generateMaze(nx, ny);
        }
    }
};

// function to shuffle the directions
const shuffleDirections = () => {
    const directions = [
        [-1, 0], [0, -1], [1, 0], [0, 1]
    ];
    return directions.sort(() => Math.random() - 0.5);
};

// generate the maze starting from a random cell
const startX = Math.floor(Math.random() * width);
const startY = Math.floor(Math.random() * height);
generateMaze(startX, startY);

// add some obstacles and perks to the maze
for (let i = 0; i < width * height * 0.1; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (maze[y][x] === 1) {
        maze[y][x] = Math.random() < 0.5 ? 2 : 3;
    }
}

// function to check if there is a solution in the maze
const hasSolution = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) {
        return false;
    }
    if (maze[y][x] === 0 || maze[y][x] === 4) {
        return false;
    }
    if (maze[y][x] === 1) {
        maze[y][x] = 4;
    }
    if (maze[y][x] === 3) {
        return true;
    }
    return (
        hasSolution(x - 1, y) ||
        hasSolution(x, y - 1) ||
        hasSolution(x + 1, y) ||
        hasSolution(x, y + 1)
    );
};

// check if there is a solution in the maze starting from the top-left corner
if (!hasSolution(0, 0)) {
    // regenerate the maze until there is a solution
    while (!hasSolution(0, 0)) {
        generateMaze(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
    }
}
