function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    windowH = windowHeight;
    windowW = windowWidth;
    //rect(959, 0, 2, windowHeight); //center line vert
    //rect(0, windowHeight/2-1, windowWidth, 2); //center line horiz
}

function frameUI() {    //setup the background frame
    background('#a3a3a3');
    strokeWeight(.5);
    fill(30);
    rect(windowW/4, 20, windowW/2, windowH - 40);
    fill(55);
    rect(windowW/4, 120, windowW/2, windowH - 140);
    textAlign(CENTER);
    textFont('Verdana', windowW * .03);
    fill(255);
    text('💣MINESWEEPER💣', windowW/2, 90);
    textFont('Arial', 12);
}

//temp values for testing, F is for fake, remove when done!
let Frows = grid.length;
let Fcolumns = grid[0].length; 

function debug() {
    fill('#a3a3a3');
    strokeWeight(0);
    rect(15, 25, 100, 100);
    fill(0);
    text('Frows: ' + Frows, 50, 50);
    text('Fcolumns: ' + Fcolumns, 50, 100);
}

function mousePressed() {
    location.reload();
}

function draw() {
    frameUI();
    debug();
    fill(255);
    strokeWeight(.5);
    squareSize = (windowW/2)/Fcolumns;
    if (squareSize * Frows  > windowH - 140) {
        squareSize = (windowH - 140)/Frows;
    }
    hPadding = ((windowW/2) - (Fcolumns*squareSize))/2;
    vPadding = ((windowH-140) - (Frows*squareSize))/2;
    for (r = 0; r < Frows; r++) {
        for (c = 0; c < Fcolumns; c++) {
            if (grid[r][c] === -1) {
                fill('Black');
            }
            else {
                fill(colors[grid[r][c]]);
            }
            if ((windowW/4 + (squareSize * c) + hPadding) < mouseX && mouseX < (windowW/4 + (squareSize * c) + hPadding + squareSize) && (120 + (squareSize * r) + vPadding) < mouseY && mouseY < (120 + (squareSize * r) + vPadding + squareSize)) {
                fill('yellow');
            }
            rect(windowW/4 + (squareSize * c) + hPadding, 120 + (squareSize * r) + vPadding, squareSize, squareSize);
        }
    }
}
