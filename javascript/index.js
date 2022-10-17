const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const gameIntro = document.querySelector('#intro')

const background = new Image()
background.src = "../images/City.webp"

const girl = new Image()
girl.src = "../images/woman.png"

const flower = new Image()
flower.src = "../images/flower.png"

const hair = new Image()
hair.src = "../images/hair.png"

const obs = new Image()
obs.src = "../images/khamenei.png"


bgX = 0;
bgY = 0;
girlX = 800
girlY = 0

function draw() {
    ctx.drawImage(background, bgX, bgY, canvas.width, canvas.height);
    ctx.drawImage(girl, girlX, girlY, 80, 80);
    ctx.drawImage(flower, flowerX, flowerY, 40, 40);
    ctx.drawImage(hair, hairX, hairY, 40, 40);
    ctx.drawImage(obs, obsX, obsY, 40, 40);
}

function startGame() {
    gameIntro.style.display = "none";
    canvas.style.display = "block";
}

window.onload = () => {
document.querySelector(".btn-start").addEventListener('click', startGame);
}
