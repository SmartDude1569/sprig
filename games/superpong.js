/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: superpong
@author: 
@tags: []
@addedOn: 2024-00-00
*/

let playerSprite1 = "b";
let playerSprite2 = "n";
let playerSprite3 = "m";
let oppSprite1 = "h";
let oppSprite2 = "j";
let oppSprite3 = "k";
let ballSprite = "v";

function setup() {
  setLegend(
    [ playerSprite1, bitmap`
................
...0000000000...
..000000000000..
.00022222222000.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.` ],
    [ playerSprite2, bitmap`
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.` ],
    [ playerSprite3, bitmap`
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.00233333333C00.
.000CCCCCCCC000.
..000000000000..
...0000000000...
................` ],
    [ ballSprite, bitmap`
................
....00000000....
...0022222200...
..022222222220..
.00222222222200.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.00222222222200.
..022222222220..
...0022222200...
....00000000....
................`],
    [ oppSprite1, bitmap`
................
...0000000000...
..000000000000..
.00077777777000.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.` ],
    [ oppSprite2, bitmap`
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.` ],
    [ oppSprite3, bitmap`
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.00755555555L00.
.000LLLLLLLL000.
..000000000000..
...0000000000...
................` ],
    [ "y", bitmap`
................
................
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
................
................` ],
    [ "u", bitmap`
................
................
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
................
................` ],
    [ "p", bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  );
  setSolids([]);
  let level = 0;
  const levels = [
    map`
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
.b.............yu.............h.
.n...........v.yu.............j.
.m.............yu.............k.
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............
...............yu...............`
  ];
  setMap(levels[level]);
  setPushables({
    [ playerSprite1 ]: [],
    [ playerSprite2 ]: [],
    [ playerSprite3 ]: []
  });
  setBackground("p");
}

let playerY = 16;
let oppY = 16;

let playerScore = 0;
let oppScore = 0;

function updatePlayer() {
  playerY = Math.min(Math.max(playerY, 1), height() - 2);
  getFirst(playerSprite1).y = playerY - 1;
  getFirst(playerSprite2).y = playerY;
  getFirst(playerSprite3).y = playerY + 1;
}

onInput("w", () => {
  playerY -= 1;
  updatePlayer();
})

onInput("s", () => {
  playerY += 1;
  updatePlayer();
});

let ballX = 15;
let ballY = 15;
let ballDx = 1;
let ballDy = 1;

function updateBall() {
  ballX += ballDx;
  ballY += ballDy;
  if (ballX == 2) {
    if (ballY == playerY - 1) {
      ballDx = -ballDx;
      ballDy = -1;
    } else if (ballY == playerY) {
      ballDx = -ballDx;
      ballDy = 0;
    } else if (ballY == playerY + 1) {
      ballDx = -ballDx;
      ballDy = 1;
    }
  }
  if (ballX == 1) {
    ballX = 0;
    ballDx = 0;
    ballDy = 0;
    oppScore += 1;
    ballX = 15;
    ballY = 15;
    ballDx = 1;
    ballDy = 1;
  }
  if (ballX == width() - 3) {
    if (ballY == oppY - 1) {
      ballDx = -1;
      ballDy = -1;
    } else if (ballY == oppY) {
      ballDx = -1;
      ballDy = 0;
    } else if (ballY == oppY + 1) {
      ballDx = -1;
      ballDy = 1;
    }
  }
  if (ballX >= width() - 1) {
    ballX = width() - 1;
    ballDx = 0;
    ballDy = 0;
    playerScore += 1;
    ballX = 15;
    ballY = 15;
    ballDx = 1;
    ballDy = 1;
  }
  if (ballY >= height() - 1 || ballY <= 0) {
    ballDy = -ballDy;
  }
  getFirst(ballSprite).x = ballX;
  getFirst(ballSprite).y = ballY;
}

function updateOpp() {
  if (oppY > ballY) {
    oppY -= Math.round(Math.random() + 0.45);
  }
  if (oppY < ballY) {
    oppY += Math.round(Math.random() + 0.45);
  }
  oppY = Math.min(Math.max(oppY, 1), height() - 2);
  getFirst(oppSprite1).y = oppY - 1;
  getFirst(oppSprite2).y = oppY;
  getFirst(oppSprite3).y = oppY + 1;
}

function updateScreen() {
  clearText();
  addText(`${playerScore}`, {
    x: 6,
    y: 2,
    color: color`3`
  });
  addText(`${oppScore}`, {
    x: 13,
    y: 2,
    color: color`5`
  });
  if (playerScore == 10) {
    ballX = 15;
    ballY = 15;
    ballDx = 0;
    ballDy = 0;
    addText("Player 1 wins!", {
      x: 3,
      y: 7,
      color: color`3`
    });
  }
  if (oppScore == 10) {
    ballX = 15;
    ballY = 15;
    ballDx = 0;
    ballDy = 0;
    addText("Bot wins!", {
      x: 6,
      y: 7,
      color: color`5`
    });
  }
}

setup();
updatePlayer();

setInterval(() => {
  updatePlayer();
  updateBall();
  updateOpp();
  updateScreen();
}, 75);