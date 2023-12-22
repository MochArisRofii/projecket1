var map = document.getElementById('gameMap');
var mapContext = map.getContext('2d');
document.addEventListener("keydown", keyPress);
map.width = 400;
map.height = 400;
var snake = [{x:20, y:200}];
var x_axis = 10;
var y_axis = 0;
var x;
var y;
var eaten_food = false;
var apple = new Image();
apple.src = "apple.png";
var score = 0;
var highscore = 0;

var startCheck = false;
var endcheck = false;
var timer;
var ender;
var mainTime;

timer = setInterval(begin, 100);
randomFood();

function main()
{
    mainTime = setInterval(update, 80);
}

function update()
{
    document.getElementById("game_over").innerHTML = "FEED THE SNAKE";
    document.getElementById("game_over2").innerHTML = "";
    if(border_check())
    {
        clearInterval(mainTime);
        ender = setInterval(reset, 100);
        return;
    }
    background();
    drawSnake();
    movement();
    drawFood(x, y);
    foodEaten();
}   

function begin()
{
    document.getElementById("game_over").innerHTML = "press enter";
    if(startCheck)
    {
        clearInterval(timer);
        main();
    }
}

function reset()
{
    if(endcheck)
    {
        console.log("he");
        clearInterval(ender);
        endcheck = false;
        snake = [{x:20, y:200}];
        x_axis = 10;
        y_axis = 0;

        if(score> highscore)
        {
            highscore = score;
            document.getElementById('highscoreboard').innerHTML = highscore;
        }

        score = 0;
        document.getElementById('scoreboard').innerHTML = score;
        randomFood();
        main();
    }
}

function background()
{
    mapContext.strokeStyle = "purple";
    mapContext.strokeRect(0, 0, map.width, map.height);
    mapContext.fillStyle = "#37ABC8";
    mapContext.fillRect(0, 0, map.width, map.height);
}

function drawSnake()
{
    for(var i = 0; i<snake.length; i++)
    {
        mapContext.beginPath();
        mapContext.arc(snake[i].x, snake[i].y, 8, 0,Math.PI*2);
        mapContext.strokeStyle = "black";
        mapContext.fillStyle = "purple";
        mapContext.stroke();
        mapContext.fill();
        mapContext.closePath();
    }
}

function randomFood()
{
    x = Math.round((Math.random()*(map.width - 20) + 20)/10)*10;
    y = Math.round((Math.random()*(map.height - 20) + 20)/10)*10; 
}

function foodEaten()
{
    if(snake[0].x == x && snake[0].y == y)
    {
        eaten_food = true;
        randomFood();
    }
}

function drawFood(corx, cory)
{
    mapContext.beginPath();
    mapContext.arc(corx, cory, 5, 0,Math.PI*2);
    mapContext.strokeStyle = "black";
    mapContext.fillStyle = "green";
    mapContext.fill();
    mapContext.stroke();
    mapContext.closePath();
    drawImg(apple, x-12, y-15, 25, 25);
}

function movement()
{
    var new_x = snake[0].x + x_axis;
    var new_y = snake[0].y + y_axis;

    snake.unshift({x: new_x, y: new_y});
    if(eaten_food == true)
    {
        eaten_food = false;
        score += 10;
        document.getElementById("scoreboard").innerHTML = score;
        return;
    }
    else{
        snake.pop();
    }
    
}

function keyPress(event)
{
    var up = 38;
    var down = 40;
    var left = 37;
    var right = 39;
    var enter = 13;
    var r = 82;

    if(event.keyCode == up && y_axis != 10)
    {
        x_axis = 0;
        y_axis -= 10
    }

    if(event.keyCode == down && y_axis != -10)
    {
        x_axis = 0;
        y_axis += 10;
    }

    if(event.keyCode == left && x_axis != 10)
    {
        x_axis -= 10;
        y_axis = 0;
    }

    if(event.keyCode == right && x_axis != -10) 
    {
        x_axis += 10;
        y_axis = 0;
    }

    if(event.keyCode == enter)
    {
        startCheck = true;
    }

    if(event.keyCode == r)
    {
        endcheck = true;
    }
}

function border_check()
{
    if(snake[0].x == 0 || snake[0].x == map.width || snake[0].y == 0 || snake[0].y == map.height)
    {
        document.getElementById('game_over').innerHTML = "Game Over";
        document.getElementById('game_over2').innerHTML = "press R to try again";
        return true;
    }

    if(snake.length > 1)
    {
        for(var i = 1; i<snake.length; i++)
        {
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
            {
                document.getElementById('game_over').innerHTML = "Game Over";
                document.getElementById('game_over2').innerHTML = "press R to try again";
                return true;
            }
        }
    }
}

function drawImg(src, x, y, w, h)
{
    mapContext.drawImage(src, x, y, w, h);
}