
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");


const box = 30;
let snake = [{x: 150, y: 150}];
let food = {x: 90, y: 90};
let dx = box, dy = 0;
let score = 0;


const gameOverSound = new Audio("g3");


document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) {dx = 0; dy = -box;}
  if (e.key === "ArrowDown" && dy === 0) {dx = 0; dy = box;}
  if (e.key === "ArrowLeft" && dx === 0) {dx = -box; dy = 0;}
  if (e.key === "ArrowRight" && dx === 0) {dx = box; dy = 0;}
});


function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);


  ctx.fillStyle = "green";
  snake.forEach(s => {
    ctx.fillRect(s.x, s.y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(s.x, s.y, box, box);
  });

 
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);


  let head = {x: snake[0].x + dx, y: snake[0].y + dy};


  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score.toString().padStart(3, "0");
    food = {
      x: Math.floor(Math.random() * (canvas.width/box)) * box,
      y: Math.floor(Math.random() * (canvas.height/box)) * box
    };
  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    document.getElementById("smiley").textContent = "😢";
    gameOverSound.play(); 
    alert("Game Over! Final Score: " + score);
    document.location.reload();
  }

  snake.unshift(head);
}


setInterval(draw, 150);
