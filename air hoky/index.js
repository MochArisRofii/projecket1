
var map = document.getElementById("field");
var mapContext = map.getContext('2d');
map.width = 500;
map.height = 700;
var pScore = 0;
var cScore = 0;








var puck = {
    x: 250,
    y: 350,
};


var player = {};


var computer = {};




main();

function main()
{
    setInterval(update, 10);
}

function update()
{
    background();
    drawCircles();
}

function background()
{
    mapContext.fillStyle = "black";
    mapContext.fillRect(0, 0, map.width, map.height);
    drawLines(0, 350, 500, 350, "grey", 5);
    drawLines(0, 350, 0, 0, "red", 10);
    drawLines(0, 0, 200, 0, "red", 10);
    drawLines(500, 350, 500, 0, "yellow", 10);
    drawLines(300, 0, 500, 0, "yellow", 10);
    drawLines(500, 700, 500, 350, "green", 10);
    drawLines(300, 700, 500, 700, "green", 10);
    drawLines(0, 350, 0, 700, "blue", 10);
    drawLines(0, 700, 200, 700, "blue", 10);
}

function drawLines(x, y, xt, yt, color, lWidth)
{
    mapContext.beginPath();
    mapContext.moveTo(x, y);
    mapContext.lineTo(xt, yt);
    mapContext.strokeStyle = color;
    mapContext.lineWidth = lWidth;
    mapContext.stroke();
    mapContext.closePath();
}


function drawCircles(x, y, radius, sAngle, eAngle, color, color2, lWidth)
{
    mapContext.beginPath();
    mapContext.arc(x, y, radius, sAngle, eAngle);
    mapContext.strokeStyle = color;
    mapContext.fillStyle = color2;
    mapContext.lineWidth = lWidth;
    mapContext.stroke();
    mapContext.closePath();
}

function drawRectangle(x, y, w, h, color, lWidth)
{
    mapContext.beginPath();
    mapContext.strokeStyle = color;
    mapContext.lineWidth = lWidth;
    mapContext.strokeRect(x, y, w, h);
    mapContext.closePath();
}

function drawScore(text, x, y, color)
{
    mapContext.font = "50px Fantasy";
    mapContext.strokeStyle = color;
    mapContext.strokeText(text, x, y)
}

function calculateDistance(mX, mY, pX, pY)
{

}