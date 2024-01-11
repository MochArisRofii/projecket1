const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let context = canvas.getContext("2d");
let lives = 3,
	score = 0,
	ballX = canvasWidth / 2,
	ballY = canvasHeight - 50,
	ballSize = 15,
	ballOffsetX = -2,
	ballOffsetY = -2,
	paddleWidht = 200,
	paddleHeight = 20,
	paddleX = canvasWidth / 2 - paddleWidht / 2,
	paddleY = canvasHeight - paddleHeight,
	paddleOffseet = 8,
	leftPassed = false,
	rightPassed = false,
	brickWidth = 80,
	brickHeight = 40,
	bricks = [];
let powerUpActive = false;

let powerUpX, powerUpY;

let	extraBalls = [];


for (let y = 0; y < 3; y++) {
	for (let x = 0; x < 7; x++) {
		let brick = {
			level: Math.floor(Math.random() * 3 + 1),
			x: x * 90 + 70,
			y: y * 50 + 60,
		};
		bricks.push(brick);
	}
}

const ifGameOver = () => {
	context.font = "30px Bold, sans-serif";
	context.fillStyle = "crimson";
	context.fillText("Game Over!!!", canvasWidth / 2 - 100, canvasHeight / 2);
	context.fillText(
		`Score : ${score}`,
		canvasWidth / 2 - 100,
		canvasHeight / 2 + 40,
	);
};

const drawPowerUp = () => {
	if (powerUpActive) {
	  	context.beginPath();
	  	context.arc(powerUpX, powerUpY, 10, 0, Math.PI * 2);
	  	context.fillStyle = "gold";
	  	context.fill();
	  	context.closePath();
	}
};

const collisionDetectionPowerUp = () => {
	if (
	  	ballX > powerUpX - 10 &&
	  	ballX < powerUpX + 10 &&
	  	ballY > powerUpY - 10 &&
	  	ballY < powerUpY + 10
	) {
	  	powerUpActive = false;
	  	extraBalls.push({ x: ballX, y: ballY, offset: -2 });
	  	extraBalls.push({ x: ballX, y: ballY, offset: 2 });
	  	extraBalls.push({ x: ballX, y: ballY, offset: 0 });
	}
};


const drawExtraBalls = () => {
	for (let i = 0; i < extraBalls.length; i++) {
	  	context.beginPath();
	  	context.arc(
			extraBalls[i].x,
			extraBalls[i].y,
			ballSize,
			0,
			Math.PI * 2
	  );
	  context.fillStyle = "fuchsia";
	  context.fill();
	  context.closePath();
  
	  extraBalls[i].y += extraBalls[i].offset;
  
	  // Logika tambahan untuk menangani bola tambahan
	  if (
			extraBalls[i].y + extraBalls[i].offset > canvasHeight - ballSize - paddleHeight &&
			extraBalls[i].x > paddleX &&
			extraBalls[i].x < paddleX + paddleWidht
	  ) {
			extraBalls[i].offset = -extraBalls[i].offset;
	  }
  
	  // Logika tambahan untuk menangani tabrakan dengan dinding atas
	  if (extraBalls[i].y + extraBalls[i].offset < ballSize) {
		extraBalls.splice(i, 1); // Hapus bola tambahan jika mencapai dinding atas
	  }
	}
};
  
  // Tambahkan logika untuk memunculkan power-up secara acak
  const spawnPowerUp = () => {
	if (!powerUpActive && Math.random() < 0.005) {
	  powerUpActive = true;
	  powerUpX = Math.random() * (canvasWidth - 20) + 10;
	  powerUpY = Math.random() * (canvasHeight / 2) + 10;
	}
  };

const ifGameFinish = () => {
	context.font = "30px Bold, sans-serif";
	context.fillStyle = "chartreuse";
	context.fillText("You Win!!!", canvasWidth / 2 - 100, canvasHeight / 2);
	context.fillText(
		`Score : ${score}`,
		canvasWidth / 2 - 100,
		canvasHeight / 2 + 40,
	);
};

const brickLevelOne = (x, y) => {
	context.beginPath();
	context.rect(x, y, brickWidth, brickHeight);
	context.fillStyle = "crimson";
	context.fill();
	context.closePath();
};

const brickLevelTwo = (x, y) => {
	context.beginPath();
	context.rect(x, y, brickWidth, brickHeight);
	context.fillStyle = "chartreuse";
	context.fill();
	context.closePath();
};

const brickLevelThree = (x, y) => {
	context.beginPath();
	context.rect(x, y, brickWidth, brickHeight);
	context.fillStyle = "yellow";
	context.fill();
	context.closePath();
};

const renderBricks = () => {
	bricks.forEach((e) => {
		if (e.level == 1) {
			brickLevelOne(e.x, e.y);
		}
		if (e.level == 2) {
			brickLevelTwo(e.x, e.y);
		}
		if (e.level == 3) {
			brickLevelThree(e.x, e.y);
		}
	});
};

const renderPaddle = () => {
	context.beginPath();
	context.rect(paddleX, paddleY, paddleWidht, paddleHeight);
	context.fillStyle = "skyblue";
	context.fill();
	context.closePath();

	if (leftPassed == true && paddleX >= 0) {
		paddleX -= paddleOffseet;
	}

	if (rightPassed == true && paddleX <= canvasWidth - paddleWidht) {
		paddleX += paddleOffseet;
	}
};

const renderBall = () => {
	context.beginPath();
	context.arc(ballX, ballY, ballSize, 0, 3 + Math.PI);
	context.fillStyle = "fuchsia";
	context.fill();
	context.closePath();

	HandleWhilePlay();
};

const HandleWhilePlay = () => {
	ballX += ballOffsetX;
	ballY += ballOffsetY;

	if (ballX >= canvasWidth - ballSize) {
		ballOffsetX = -ballOffsetX;
	}

	if (ballX <= ballSize) {
		ballOffsetX = -ballOffsetX;
	}

	if (ballY <= ballSize) {
		ballOffsetY = -ballOffsetY;
	}

	if (ballY >= canvasHeight - ballSize - paddleHeight) {
		if (
			ballX + ballSize >= paddleX &&
			ballX + ballSize <= paddleX + paddleWidht
		) {
			ballOffsetY = -ballOffsetY;
		} else {
			lives -= 1;
			ballX = canvasWidth / 2;
			ballY = canvasHeight / 2;
			ballOffsetX = -2;
			ballOffsetY = -2;
			paddleX = canvasWidth / 2 - paddleWidht / 2;
			paddleY = canvasHeight - paddleHeight;
		}
	}

	let i = 0;
	bricks.forEach((e) => {
		if (
			e.level > 0 &&
			ballX >= e.x &&
			ballX <= e.x + brickWidth &&
			ballY >= e.y &&
			ballY <= e.y + brickHeight
		) {
			{
				ballOffsetY = -ballOffsetY;
				e.level -= 1;
				score += 1;
			}
		}
		i++;
	});
};

const HandleKeyDown = (e) => {
	if (e.keyCode == 37) {
		leftPassed = true;
	}
	if (e.keyCode == 39) {
		rightPassed = true;
	}
};

const HandleKeyUp = (e) => {
	if (e.keyCode == 37) {
		leftPassed = false;
	}
	if (e.keyCode == 39) {
		rightPassed = false;
	}
};

const renderGame = () => {
	context.clearRect(0, 0, canvasWidth, canvasHeight);

	let win = true;

	bricks.forEach((e) => {
		if (e.level != 0) {
			win = false;
		}
	});
	if (lives <= 0) {
		ifGameOver();
	} else {
		if (win) {
			ifGameFinish();
		} else {
			context.font = "Bold 24px arial sans-serif";
			context.fillStyle = "crimson";
			context.fillText(`Lives : ${lives}`, 50, 50, 200);
			context.fillText(`Score : ${score}`, 250, 50, 200);
			renderBricks();
			renderPaddle();
			renderBall();
			drawPowerUp();
      		drawExtraBalls();
      		collisionDetectionPowerUp();
      		spawnPowerUp();
		}
	}
};

document.addEventListener("keydown", HandleKeyDown);
document.addEventListener("keyup", HandleKeyUp);

setInterval(renderGame, 10);