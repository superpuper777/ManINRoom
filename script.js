let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let xCoord = 210;
let yCoord = 210;
let cell = 60;

let auto = false;
let taskRunner;
let defaultX = 3;
let defaultY = 3;

drawRoom();
drawManUp();

function drawRoom() {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      ctx.strokeRect(i * 60, j * 60, 60, 60);
    };
  };
};

function drawManUp() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoom();
  ctx.beginPath(); //Тело
  ctx.fillStyle = "blue";
  ctx.fillRect(xCoord - 20, yCoord - 10, 40, 20);
  ctx.fillRect(xCoord - 25, yCoord - 5, 5, 10); //Лев рука
  ctx.fillRect(xCoord + 20, yCoord - 5, 5, 10); //прав рука
  ctx.closePath();

  ctx.beginPath(); //Голова
  ctx.fillStyle = 'ivory';
  ctx.arc(xCoord, yCoord, 8, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath(); //шапка
  ctx.fillStyle = 'black';
  ctx.arc(xCoord, yCoord, 8, 0, Math.PI, false);
  ctx.fill();
  ctx.closePath();
}

function drawManRight() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoom();
  ctx.beginPath(); //Тело
  ctx.fillStyle = "blue";
  ctx.fillRect(xCoord - 10, yCoord - 20, 20, 40);
  ctx.fillRect(xCoord - 5, yCoord - 25, 10, 5); //Лев рука
  ctx.fillRect(xCoord - 5, yCoord + 20, 10, 5); //прав рука
  ctx.closePath();

  ctx.beginPath(); //Голова
  ctx.fillStyle = 'ivory';
  ctx.arc(xCoord, yCoord, 8, 3 * Math.PI / 2, Math.PI / 2, false);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath(); //шапка
  ctx.fillStyle = 'black';
  ctx.arc(xCoord, yCoord, 8, Math.PI / 2, 3 * Math.PI / 2, false);
  ctx.fill();
  ctx.closePath();

}

function drawManLeft() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoom();
  ctx.beginPath(); //Тело
  ctx.fillStyle = "blue";
  ctx.fillRect(xCoord - 10, yCoord - 20, 20, 40);
  ctx.fillRect(xCoord - 5, yCoord - 25, 10, 5); //Лев рука
  ctx.fillRect(xCoord - 5, yCoord + 20, 10, 5); //прав рука
  ctx.closePath();

  ctx.beginPath(); //Голова
  ctx.fillStyle = 'ivory';
  ctx.arc(xCoord, yCoord, 8, Math.PI / 2, 3 * Math.PI / 2, false);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath(); //шапка
  ctx.fillStyle = 'black';
  ctx.arc(xCoord, yCoord, 8, 3 * Math.PI / 2, Math.PI / 2, false);
  ctx.fill();
  ctx.closePath();
}

function drawManDown() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoom();
  ctx.beginPath(); //Тело
  ctx.fillStyle = "blue";
  ctx.fillRect(xCoord - 20, yCoord - 10, 40, 20);
  ctx.fillRect(xCoord - 25, yCoord - 5, 5, 10); //Лев рука
  ctx.fillRect(xCoord + 20, yCoord - 5, 5, 10); //прав рука
  ctx.closePath();

  ctx.beginPath(); //Голова
  ctx.fillStyle = 'ivory';
  ctx.arc(xCoord, yCoord, 8, 0, Math.PI, false);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath(); //шапка
  ctx.fillStyle = 'black';
  ctx.arc(xCoord, yCoord, 8, Math.PI, 0, false);
  ctx.fill();
  ctx.closePath();

}

function autoGo() {
  if (yCoord > 30 && xCoord !== 30 && yCoord !== 390 ||
    xCoord == 390 && yCoord == 390) {
    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'ArrowUp',
      'code': 'ArrowUp'
    }));
  } else if (yCoord == 30 && xCoord > 30) {
    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'ArrowLeft',
      'code': 'ArrowLeft'
    }));
  } else if (xCoord <= 30 && yCoord < 390) {
    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'ArrowDown',
      'code': 'ArrowDown'
    }));
  } else if (yCoord == 390 && xCoord < 390) {
    document.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'ArrowRight',
      'code': 'ArrowRight'
    }));
  };
};



document.getElementById('autoPilot').addEventListener('click', function () {
  auto = !auto;
  if (auto) {
    taskRunner = setInterval(autoGo, 1000);
  } else {
    clearInterval(taskRunner);
  }
});

document.addEventListener('keydown', function (e) {
  if (e.code == 'ArrowUp') {
    if (yCoord > 60) {
      yCoord -= cell;
      defaultY -= 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawManUp();
    } else if (yCoord < 60) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawManUp();
    }
  }
  if (e.code == 'ArrowLeft') {
    if (xCoord > 60) {
      xCoord -= cell;
      defaultX -= 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawManLeft();
    } else if (xCoord < 60) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawManLeft();
    }
  }
  if (e.code == 'ArrowRight') {
    if (xCoord < 380) {
      xCoord += cell;
      defaultX += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawManRight();
    } else if (xCoord > 380) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawManRight();
    }
  }
  if (e.code == 'ArrowDown') {
    if (yCoord < 380) {
      yCoord += cell;
      defaultY += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawManDown();
    } else if (yCoord > 380) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawManDown();
    }
  }
  console.log('X = ' + xCoord);
  console.log('Y = ' + yCoord);
});