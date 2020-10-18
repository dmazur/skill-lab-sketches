let img;
let font;

let fontSizeMax = 24;
let fontSizeMin = 10;
const spacing = 12;
const kerning = 0.5;

let staticFontSize = false;
let inGrayscale = false;

let txt = '';

function preload() {
  img = loadImage('img/face.png');
  font = loadFont('font/font.ttf');
}

function setup() {
  createCanvas(550, 800);
  textFont(font);
}

function draw() {
  background(255);
  
  let x = 0;
  let y = 10;
  let counter = 0;
  
  img.loadPixels();
  
  while (y <= height) {
    let letter = txt[counter];
    let imgX = map(x, 0, width, 0, img.width);
    let imgY = map(y, 0, height, 0, img.height);
    let c = color(img.get(imgX, imgY));
    let grayscale = round(red(c) + green(c) + blue(c));
    let size = round(map(grayscale, 0, 255*3, fontSizeMax, fontSizeMin));
    
    if (inGrayscale) {
      fill(grayscale/3);
    } else {
      fill(c);
    }
    
    if (!staticFontSize) {
      textSize(size);
    }
    text(letter, x, y);
    x += textWidth(letter) + kerning;
    
    if (x >= width) {
      x = 0;
      y += spacing;
    }
    
    counter++;
    if (counter >= txt.length) {
      counter = 0;
    }
  }
  noLoop();
}

function keyReleased() {
  if (key === 's') saveCanvas('result.png');
  if (key === '1') staticFontSize = !staticFontSize;
  if (key === '2') inGrayscale = !inGrayscale;
  
  loop();
}

function keyPressed() {
  if (keyCode === UP_ARROW) fontSizeMax += 2;
  if (keyCode === DOWN_ARROW && fontSizeMax > 2) fontSizeMax -= 2;
  if (keyCode === RIGHT_ARROW) fontSizeMin += 2;
  if (keyCode === LEFT_ARROW && fontSizeMin > 2) fontSizeMin -= 2;
}

txt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi augue, dapibus sed neque tempus, dignissim gravida purus. Duis gravida pretium massa, pellentesque egestas dolor vestibulum id. Vivamus elit elit, aliquam id aliquet id, sagittis eget eros. Pellentesque sed nisi vel orci tristique tristique quis ut purus. Donec blandit lobortis ante, ut gravida nibh fringilla lobortis. Morbi lacus nulla, dictum sed turpis ac, luctus ullamcorper massa. Morbi ut metus id magna tempor faucibus quis at dolor. Aliquam erat lacus, commodo et magna at, dapibus tincidunt nulla.';

