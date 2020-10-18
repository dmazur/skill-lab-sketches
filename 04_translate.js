function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(220);
  
  const gutter = 10;
  const numRows = 24;
  const numCols = 24;
  
  const cellSizeX = (width - gutter*2) / numRows;
  const cellSizeY = (height - gutter*2) / numCols;
  
  let bars = 1;
  
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const x = i * cellSizeX + gutter;
      const y = j * cellSizeY + gutter;
      
      strokeWeight(4);
      
      const gap = cellSizeX / bars;
      
      bars = 1 + floor(j / (numCols / 3));
      // rect(x, y, cellSizeX, cellSizeY);
      
      push();
      
      translate(x, y);
      translate(cellSizeX/2, cellSizeY/2);
      rotate(random(0, TWO_PI));
      
      translate(-(gap * (bars-1))/2, 0);
      
      for (let b = 0; b < bars; b++) {
        line(0, -cellSizeY/2, 0, cellSizeY/2);
        translate(gap, 0);
      }
      
      pop();
    }
  }
}

