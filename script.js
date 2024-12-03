// script.js

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Game settings
const box = 20; // size of each grid box
let score = 0;

// Update score display
const scoreDisplay = document.getElementById("score");

// Snake setup
let snake = [{ x: 9 * box, y: 10 * box }]; // Starting position
let direction = null;

// Food setup
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box,
};

// Game loop interval
let game = setInterval(drawGame, 100);

// Draw the game
function drawGame() {
  // Background
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#1db954" : "#66bb6a";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Update snake's position
  let head = { ...snake[0] };
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score; // Update score in UI
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
  } else {
    snake.pop(); // Remove the last part of the snake if no food eaten
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check for collisions
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    collision(head, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
  }
}

// Collision detection
function collision(head, snakeArray) {
  for (let i = 1; i < snakeArray.length; i++) {
    if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

// Handle key presses
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});
