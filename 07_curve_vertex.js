let shapeRes = 15;
let initRad = 150;
let step = 2;
let filled = false, freeze = false;
let centerX, centerY;
let x = [], y = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  centerX = width / 2;
  centerY = height / 2;
  
  let angle = radians(360 / shapeRes);
  
  for (let i = 0; i < shapeRes; i++) {
    x.push(cos(angle * i) * initRad);
    y.push(sin(angle * i) * initRad);
  }
  
  stroke(0, 50);
  strokeWeight(1);
  background(255);
}

function draw() {
  centerX += (mouseX - centerX) * 0.01;
  centerY += (mouseY - centerY) * 0.01;
  
  for (let i = 0; i < shapeRes; i++) {
    x[i] += random(-step, step);
    y[i] += random(-step, step);
    
    // ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
  }
  
  if (filled) {
    fill(random(255));
  } else {
    noFill();
  }
  
  beginShape();
  
  // first control point
  curveVertex(x[shapeRes-1] + centerX, y[shapeRes-1] + centerY);
  
  for (let i = 0; i < shapeRes; i++) {
    curveVertex(x[i] + centerX, y[i] + centerY);
  }
  
  curveVertex(x[0] + centerX, y[0] + centerY);
  
  // second control point
  curveVertex(x[1] + centerX, y[1] + centerY);
  
  endShape();
}

function mousePressed() {
  let angle = radians(360 / shapeRes);
  let radius = initRad * random(0.5, 1);
  
  centerX = mouseX;
  centerY = mouseY;
}

function keyReleased() {
  if (keyCode === DELETE || keyCode === BACKSPACE) background(255);
  if (key === 's') saveCanvas('result.png');
  if (key === '1') filled = !filled;
  if (key === 'f') {
    freeze = !freeze;
    if (freeze) {
      noLoop(); 
    } else {
      loop();  
    }
  }
}

