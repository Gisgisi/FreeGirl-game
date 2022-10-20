
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const gameIntro = document.querySelector('#intro')
const win = document.getElementById('#win')


//My visuals here except for collectables and obstacle
const background = new Image()
background.src = "images/city.png"
const background2 = new Image()
background2.src = "images/city-mirror.png"

const girl = new Image()
girl.src = "images/woman.png"

const obstacleImage = new Image();

// const birdOne = new Image()
// birdOne.src = "../images/birdgifr.gif"

// const birdTwo = new Image()
// birdTwo.src = "../images/birdgifl.gif"

const gamePlay = document.querySelector('#game-play');


//Variables
let bgX = 0, bgY = 0;
let bgX2 = canvas.width, bgY2 = 0;
let girlX = 35, girlY = 500;
let obstacleX = canvas.width, obstacleY = canvas.height - 130;
let gameId = 0;
let score = 0;


//Drawing the gameplay inviroment
function draw() {
    ctx.clearRect(girlX, girlY, 60, 60);
    ctx.drawImage(background, bgX, bgY, canvas.width, canvas.height);
    ctx.drawImage(background2, bgX2, bgY2, canvas.width, canvas.height);
    ctx.drawImage(girl, girlX, girlY, 60, 60);
    drawObstacle();
    bgMove();
    
    //winAlert()
    gameId = requestAnimationFrame(draw)
    if (score < 0) {
        console.log(gameId);
        cancelAnimationFrame(gameId);
    }
    // if(score === 1000){
    //     cancelAnimationFrame(gameId); 
    //     winAlert();
    // }
}

//winning window



//losing window

//How collectable appear as an object

class obstacle {
    constructor(name, width, height, score) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.score = score;
        this.collided = false;
    }
    getName() {
        return this.name
    }
    getWidth() {
        return this.width
    }
    getHeight() {
        return this.height
    }
    getScore() {
        return this.score
    }
    getImage() {
        return "images/" + this.name + ".png";
    }
    getCollided() {
        return this.collided;
    }
    setCollided(value) {
        this.collided = value;
    }
}

//the obstacle has a random score defined here
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let obstacleArray = [
    new obstacle("flower", 30, 30, 15),
    new obstacle("hair", 30, 30, 20),
    new obstacle("enemy", 25, 55, getRandomIntInclusive(-20, -30))
];

//Showing collectables randomly
let currentObstacle = obstacleArray[randomIntFromInterval(0, obstacleArray.length - 1)];

function drawObstacle() {
    obstacleX -= 5;
    obstacleImage.src = currentObstacle.getImage();
    ctx.drawImage(obstacleImage, obstacleX, obstacleY, currentObstacle.getWidth(), currentObstacle.getHeight());

    if (obstacleX < -40) {
        currentObstacle = obstacleArray[randomIntFromInterval(0, obstacleArray.length - 1)];
        obstacleX = canvas.width;
        obstacleY = randomIntFromInterval(canvas.height - 100, canvas.height - 40);
        currentObstacle.setCollided(false);
    }
    scoreCount()
}

//Calculating score
function scoreCount() {
    if ((girlY < obstacleY + currentObstacle.getHeight() &&
        girlY + 60 > obstacleY &&
        obstacleX <= girlX + 40) ||
        (girlY <= obstacleY + currentObstacle.getHeight &&
            girlX + 50 > obstacleX &&
            girlX < obstacleX + currentObstacle.getWidth())) {
        if (!currentObstacle.getCollided()) {
            score += currentObstacle.getScore();
            document.getElementById("score").innerText = score;
            currentObstacle.setCollided(true);
        }

    }

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


//girl movement

function girlUp() {
    if (girlY >= 450) {
        girlY -= 8;
    }
}

function girlDown() {
    if (girlY <= 540) {
        girlY += 8;
    }
}

//Background Movement
function bgMove() {
    bgX -= 5;
    bgX2 -= 5;
    if (bgX == -canvas.width) {
        bgX = canvas.width;
    }

    if (bgX2 == -canvas.width) {
        bgX2 = canvas.width;
    }

}


//game start
function startGame() {
    gameIntro.style.display = "none";
    gamePlay.style.display = "block";;
    draw()
    girlDown()
    girlUp()
    bgMove()
}

function backButton() {
    gameIntro.style.display = "flex";
    gamePlay.style.display = "none";
    cancelAnimationFrame(gameId);
}


//bottuns
window.onload = () => {
    document.querySelector(".btn-start").addEventListener('click', startGame);

    document.addEventListener('keydown', Event => {
        if (Event.key === 'ArrowUp') {
            girlUp();
        }
        if (Event.key === 'ArrowDown') {
            girlDown();
        }
    });
    document.querySelector("#back-btn").addEventListener('click', backButton);
}