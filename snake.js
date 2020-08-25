const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");


//create background
const ground = new Image();
ground.src = "./img/ground.png";

//Create food
const foodImg = new Image();
foodImg.src = "./img/food.png";

// create unit (1box = 32px)
const box = 32;

// create snake (array)
let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// Audio
const dead = new Audio();
dead.src = "./audio/dead.mp3"
const eat = new Audio();
eat.src = "./audio/eat.mp3"
const move1 = new Audio();
move1.src = "./audio/move1.mp3"
const move2 = new Audio();
move2.src = "./audio/move2.mp3"

//create the food random position
let food = {
    x: Math.floor(Math.random() * 16 + 1) * box, // between 32 and 17*32
    y: Math.floor(Math.random() * 14 + 3) * box // between 32*3 and 17*32
};

// create the score
let score = 0;

//control snake,
let d; //direction

document.addEventListener("keydown", (event) => {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
        move1.play();
    }
    else if (key == 38 && d != "DOWN") {
        move2.play();
        d = "UP";
    }
    else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        move1.play();
    }
    else if (key == 40 && d != "UP") {
        move2.play();
        d = "DOWN";
    }

});

//function to manage collision with the tail
function collision(head, array) {
    for (let i = 1; i < array.length; i++) {
        if ((head.x == array[i].x) && (head.y == array[i].y)) {
            return true;
        }
    }
    return false;
}

// create button when game is over
function addButton() {
    let btn = document.createElement('input');
    let div = document.getElementById("btn");
    btn.type="button";
    btn.class="reboot-btn";
    btn.value="press Enter or click to REBOOT";
    div.appendChild(btn);

    btn.addEventListener("click", () => {
        document.location.reload(true);
    });
    document.addEventListener("keydown", (event) => {
        let key = event.keyCode
        if( key == 13) {document.location.reload(true);}
    });
}

// function to check if food appears on the snake
function checkFoodIsOnSnake(food,snake) {
    for(let i = 0 ; i < snake.length ; i++) {
        if (snake[i].x == food.x || snake[i].y == food.y){
            return true;
        }
    }
    return false;
}


// function for drawing eveything in the canvas
function draw() {

    //background
    ctx.drawImage(ground, 0, 0);

    // snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // food
    ctx.drawImage(foodImg, food.x, food.y);

    // score
    ctx.fillStyle = "white";
    ctx.font = " 45px Changa one";
    ctx.fillText(" : " + score, 2 * box, 1.6 * box);

    // old head snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction ?
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;



    //collision with food
    if (snake[0].x == food.x && snake[0].y == food.y) {
        eat.play();
        score++;
        while(checkFoodIsOnSnake(food,snake)) {
            food = {
                x: Math.floor(Math.random() * 16 + 1) * box, // between 32 and 17*32
                y: Math.floor(Math.random() * 14 + 3) * box // between 32*3 and 17*32
            };
        }
    }
    else { //we remove the tail
        snake.pop();
    }

    //new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    // //rules of the game =>> game over ?
    if ((snake[0].x < box) || (snake[0].x > 17 * box) || (snake[0].y < 3 * box) || (snake[0].y > 17 * box) || (collision(newHead, snake) == true)) {
        dead.play();
        clearInterval(game);
        ctx.fillText('GAME OVER', 8 * box, 1.6 * box, 500);
        addButton();
    }
}

// call draw function every 100 ms
let game = setInterval(draw, 100);

