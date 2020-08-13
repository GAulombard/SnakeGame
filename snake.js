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
    x: 9*box,
    y: 10*box
};

//create the food random position
let food = {
    x: Math.floor(Math.random()*16+1)  * box, // between 32 and 17*32
    y: Math.floor(Math.random()*14+3)  * box // between 32*3 and 17*32
};
console.log("-- Coordonnées de food --");
console.log("x = "+food.x/32);
console.log("y = "+food.y/32);

// create the score
let score = 0;

//control snake,
let d;

document.addEventListener("keydown", (event) => { 
    let key = event.keyCode;
    if(key == 37 && d != "RIGHT") {
        d = "LEFT";
    }
    else if(key == 38 && d != "DOWN") {
        d = "UP";
    }
    else if(key == 39 && d != "LEFT") {
        d = "RIGHT";
    }
    else if(key == 40 && d != "UP") {
        d = "DOWN";
    }

});

// drawing eveything in the canvas
function draw() {
    
    ctx.drawImage(ground,0,0);

    // snake
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    // food
    ctx.drawImage(foodImg,food.x,food.y);

    // score
    ctx.fillStyle="white";
    ctx.font =" 45px Changa one";
    ctx.fillText(" : "+score, 2*box, 1.6*box);

}

// call draw function every 100 ms
let game = setInterval(draw,100);