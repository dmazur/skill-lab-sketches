let diameter = 100;
let x = 10;
let n = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  noFill();
  noStroke();
}

function draw() {
  background(0);
  
  strokeWeight(4);
  point(10, 10);
  point(width-10, height-10);
  
  strokeWeight(1);
  
  rectMode(CENTER);
  rect(width/2, height/2, diameter*2, diameter*2);
  ellipse(width/2, height/2, diameter, diameter);
  
  line(x, 10, width-10, height-10);
  line(x, 10, x, height-10);
  
  n += 1;
  
  if (n <= 100) {
    stroke(255, 255, 0);
  } else {
    stroke(255, 0, 0);
  }
  
  for (let i = 0; i < width; i += 10) {
    line(x+i, 0, x+i, height-10);
  } 
}

