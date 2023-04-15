// Get player
const player = document.getElementById("player");
const playerRect = player.getBoundingClientRect();

const trail = document.getElementById("trail");

// Get controls
const controlsDiv = document.getElementById("controls");

// Get buttons
const settingsButton = document.querySelector("#settings");

// Get background
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Vars
let position = { x: 0, y: 0 };
const speed = 5;
let startTime = null;
let isGameRunning = false;
let playerFill;
const pressedKeys = new Set();

// Touch support vars
let joystick, stick;

const maxDistance = 40; // maximum distance the stick can move

// Canvas vars
const stars = [];
const numStars = 200;
const minSize = 3;
const maxSize = 20;
const minColorValue = 125;
const maxColorValue = 255;

let bgImg;
