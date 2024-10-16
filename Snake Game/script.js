var c = document.getElementById('canvas');
var ctx = c.getContext('2d');  
ctx.fillStyle = 'black';        
ctx.fillRect(0, 0, 560, 560); 

let foodX; 
let foodY; 
const snakeSize = 40;
const gridSize = 40;
let currentDirection = null; 
let snakeBody = [{ x: 80, y: 80 }]; 
let gameOver = false; 
let score = 0; 

function drawGridPattern() {
    for (let i = 0; i <= c.width; i += gridSize) { 
        for (let j = 0; j <= c.height; j += gridSize) {
            if (j === 0) {
                continue
            }
            if ((i / gridSize + j / gridSize) % 2 === 0) {
                ctx.fillStyle = ' rgba(0,128,0,255)'; 
            } else {
                ctx.fillStyle = ' rgba(34,139,34,255)'; 
            }
            ctx.fillRect(i, j, gridSize, gridSize); 
            // ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; 
            // ctx.lineWidth = 1; 
            // ctx.strokeRect(i, j, gridSize, gridSize); 
        }
    }
}

function createSnake() {
    ctx.fillStyle = 'black';        
    for (let segment of snakeBody) {
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    }
}

function createFood() {
        foodX = Math.floor(Math.random() * (c.width / gridSize)) * gridSize;
        foodY = Math.floor(Math.random() * ((c.height / gridSize) - 1)) * gridSize + gridSize;
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height); 
    ctx.fillStyle = 'black';        
    ctx.fillRect(0, 0, 560, 560); 
    drawGridPattern(); 
    createSnake(); 

    ctx.fillStyle = 'red'; 
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over!', 200, 250);
        ctx.fillText('Refresh to Restart', 170, 300);
    }

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30); 
}

function moveSnake() {
    if (gameOver) return; 
    let head = { x: snakeBody[0].x, y: snakeBody[0].y };

    if (currentDirection === 'up') {
        head.y -= gridSize; 
        if (head.y < gridSize) {
            head.y = c.height - gridSize; 
        }
    } 
    else if (currentDirection === 'down') {
        head.y += gridSize; 
        if (head.y >= c.height) {
            head.y = gridSize; 
        }
    } 
    else if (currentDirection === 'left') {
        head.x -= gridSize; 
        if (head.x < 0) {
            head.x = c.width - snakeSize;
        }
    } 
     if (currentDirection === 'right') {
        head.x += gridSize; 
        if (head.x >= c.width) {
            head.x = 0;
        }
    }

    if (checkCollision(head)) {
        createFood(); 
        score++; 
     } 
     else {
        snakeBody.pop(); 
    }

    if (checkSelfCollision(head)) {
        gameOver = true; 
    } else {
        snakeBody.unshift(head); 
    }

    draw(); 
}

function checkCollision(head) {
    if (head.x < foodX + snakeSize &&
        head.x + snakeSize > foodX &&
        head.y < foodY + snakeSize &&
        head.y + snakeSize > foodY) {
        return true; 
    }
    return false; 
}

function checkSelfCollision(head) {
    for (let i = 1; i < snakeBody.length; i++) {
        if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
            return true; 
        }
    }
    return false; 
}

document.addEventListener('keydown', function(event) {
    if (gameOver) return; 
    if (event.key === 'ArrowUp' && currentDirection !== 'down') {
        currentDirection = 'up';
    } else if (event.key === 'ArrowDown' && currentDirection !== 'up') {
        currentDirection = 'down';
    } else if (event.key === 'ArrowLeft' && currentDirection !== 'right') {
        currentDirection = 'left';
    } else if (event.key === 'ArrowRight' && currentDirection !== 'left') {
        currentDirection = 'right';
    }
});

createFood(); 

draw();

setInterval(moveSnake, 200);