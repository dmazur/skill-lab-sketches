let diameter = 100;
let n = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  n += 1;
  
  strokeWeight(1);
  ellipse(mouseX, mouseY, diameter*sin(n), diameter*cos(n));
}

