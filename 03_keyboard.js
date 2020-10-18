let sz = 100;
let value = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  fill(value);
  rectMode(CENTER);
  rect(width/2, height/2, sz, sz)
}

function keyPressed() {
  if (value === 0) {
    value = 255;
  } else {
    value = 0;
  }
}

