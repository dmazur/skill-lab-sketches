const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const MAX_DIAMETER = 200;
const MAX_DISTORTION_INNER_MARGIN_PCT = 0.80;

// diameter of the circle
let startingDiameter = 900;
// to calculate the inner circle
let distortionInnerMarginPct = 0.80;
// how many points does the vertex curve have
// these will shift up and down between inner and outer circle
let distortionVectorCount = 60;
// diameter of the inner circle
let innerDiameter = startingDiameter - startingDiameter * distortionInnerMarginPct;
// this will store all the points of the curve
let distortionVectors = [];
// makes the curve points less jittery, by providing 1:10 chance to change direction
let lengthDistortionContinuityFactor = 10;
// defines if points can pass eachother
let allowOverdistortion = false;
// how fast the whole shape rotates
let rotationSpeed = 1;
// curve colors in HSB
let hsbColors = [0,240,0];
// bg colors (unused)
let hsbBgColors = [0,0,255];
let mousePosition = {x:0, y:0};
// how fast the hue changes
let hueChangeFactor = 1;
let curveStrokeWeight = 1;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  colorMode(HSB, 255, 255, 255, 1);
  frameRate(30);
  
  distortionVectors = generateDistortionVectors();
  background(...hsbBgColors, 1);
}

function mousePressed() {
  hsbColors = [0,240,0];
  hsbBgColors = [0,0,255];
  hueChangeFactor = 1;
  curveStrokeWeight = 1;
}

function draw() {
  readMousePosition();
  hsbColors[0] = shiftColorHue(hsbColors[0], hueChangeFactor, 50);
  
  if (mouseIsPressed) {
    hsbColors = incColorIntensity(hsbColors);
    drawCurves();
  }
  
  for (let vector of distortionVectors) {
    distortVector(vector);
  }
}

function incColorIntensity(hsbColors) {
  if (hsbColors[2] < 255) {
    hsbColors[2]+=3
    hsbBgColors[1] += 2;
    hueChangeFactor += 0.05;
  }
  
  return hsbColors;
}

function shiftColorHue(hue, factor, max) {
  let newHue = hue + factor;
  
  if (newHue > max) {
    newHue = newHue - max;
  }

  return newHue;
}

/**
 * Generate all the points of the vertex curve
 */
function generateDistortionVectors() {
  const circleChunkSize = 360 / distortionVectorCount;
  const vectors = [];

  for (let i = 0; i < distortionVectorCount; i++) {
    const currentChunkStart = circleChunkSize * i;
    const currentChunkEnd = circleChunkSize * i + circleChunkSize * 0.75;
    const position = Math.floor(random(currentChunkStart, currentChunkEnd));
    vectors.push({
      length: startingDiameter / 2,
      position: position,
      lastLengthChange: 0,
    });
  }

  return vectors;
}

/**
 * Shifts the point on the curve between inner and outer circle
 */
function distortVector(vector) {
  let lengthModifier = 0;
  if (vector.lastLengthChange >= 0) {
    // vector/point last change was positive, it has 1:10 chance to switch directions
    const factorArray = Array(lengthDistortionContinuityFactor).fill(1);
    factorArray[0] = -1;
    lengthModifier = random(factorArray);
  } else {
    // vector/point last change was negative, it has 1:10 chance to switch directions
    const factorArray = Array(lengthDistortionContinuityFactor).fill(-1);
    factorArray[0] = 1;
    lengthModifier = random(factorArray);
  }
  const newLength = vector.length + lengthModifier;
  
  // change length from the center of the circle to the point for the curve
  if (newLength >= innerDiameter/2 && newLength <= startingDiameter/2) {
    vector.length = newLength;
    vector.lastLengthChange = lengthModifier;
  } else if (newLength < innerDiameter/2) {
    vector.length = innerDiameter/2;
  } else if (newLength > startingDiameter/2) {
    vector.length = startingDiameter/2;
  }

  // rotate
  let vectorPositionChange = -1 * rotationSpeed;
  if (allowOverdistortion) {
    vectorPositionChange = random(-1 * rotationSpeed, 0);
  }

  vector.position = vector.position >= 360 ? 0 : vector.position + vectorPositionChange;
}

function drawCurves() {
  push();

  colorMode(HSB, 255, 255, 255, 255);
  let x, y;
  translate(mousePosition.x, mousePosition.y);
  noFill();
  strokeWeight(curveStrokeWeight);
  stroke(hsbColors[0], hsbColors[1], hsbColors[2], 50);
  beginShape();
  x = distortionVectors[distortionVectors.length-1].length * sin(radians(distortionVectors[distortionVectors.length-1].position));
  y = distortionVectors[distortionVectors.length-1].length * cos(radians(distortionVectors[distortionVectors.length-1].position));
  curveVertex(x, y);
  for (let vector of distortionVectors) {
    x = vector.length * sin(radians(vector.position));
    y = vector.length * cos(radians(vector.position));
    curveVertex(x, y);
  }
  x = distortionVectors[0].length * sin(radians(distortionVectors[0].position));
  y = distortionVectors[0].length * cos(radians(distortionVectors[0].position));
  curveVertex(x, y);
  x = distortionVectors[1].length * sin(radians(distortionVectors[1].position));
  y = distortionVectors[1].length * cos(radians(distortionVectors[1].position));
  curveVertex(x, y);
  endShape();

  pop();
}

function readMousePosition() {
  mousePosition.x = mouseX;
  mousePosition.y = mouseY;
}

function keyPressed() {
  if (key === 's') {
    saveCanvas('result.png');
  }

}

