let img;

function preload() {
  img = loadImage('img/pic.png');
}

function setup() {
  createCanvas(1024, 780);

  image(img, 0, 100);
}

function draw() {
  // changed so the mouse has to be clicked
  if (mouseIsPressed) {
    let x1 = floor(random(width));
    let y1 = 50;
    x1 = mouseX;
    y1 = mouseY;

    let x2 = x1 + floor(random(-7, 7));
    let y2 = y1 + floor(random(-5, 5));

    let w = floor(random(10, 30));
    let h = height - 100;

    w = 100;
    h = 100;

    set(x2, y2, get(x1, y1, 0.5*w, 0.5*h));
  }
}

function keyReleased() {
  if (key === 's' || key === 'S') {
    saveCanvas('result.png');
  }
  
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    clear();
    image(img, 0, 100);
  }
}

