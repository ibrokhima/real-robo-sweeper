function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    windowH = windowHeight;
    windowW = windowWidth;
    loss = false;
    timer = 0;
    //rect(959, 0, 2, windowHeight); //center line vert
    //rect(0, windowHeight/2-1, windowWidth, 2); //center line horiz
}

document.oncontextmenu = function() { //removes rightclick context menu
        return false;
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
    //text('💣MINESWEEPER💣', windowW/2, 90);
}

function debug() {
    textFont('Arial', 12);
    fill(0);
    text('Frows: ' + rows, 50, 50);
    text('Fcolumns: ' + columns, 50, 100);
}

function game() {
    fill(255);
    strokeWeight(.5);
    squareSize = (windowW/2)/columns;
    if (squareSize * rows  > windowH - 140) {
        squareSize = (windowH - 140)/rows;
    }
    hPadding = ((windowW/2) - (columns*squareSize))/2;
    vPadding = ((windowH-140) - (rows*squareSize))/2;
    for (r = 0; r < rows; r++) {
        for (c = 0; c < columns; c++) {
            if (overlayGrid[r][c] === -1) {
                loss = true;
                console.log("you lost");
            }
            else {
                fill(colors[overlayGrid[r][c]]);
            }
            if ((windowW/4 + (squareSize * c) + hPadding) < mouseX && mouseX < (windowW/4 + (squareSize * c) + hPadding + squareSize) && (120 + (squareSize * r) + vPadding) < mouseY && mouseY < (120 + (squareSize * r) + vPadding + squareSize)) {
                fill("yellow");
            }
            rect(windowW/4 + (squareSize * c) + hPadding, 120 + (squareSize * r) + vPadding, squareSize, squareSize);
        }
    }
}

function mousePressed() {
    rowSelected = Math.floor((mouseY - 120 - vPadding)/squareSize);
    colSelected = Math.floor((mouseX - windowW/4 - hPadding)/squareSize);
    if (mouseButton === RIGHT) {
        if (overlayGrid[rowSelected][colSelected] === 9) {
            overlayGrid[rowSelected][colSelected] = 10;
        }
        else {
            overlayGrid[rowSelected][colSelected] = 9;
        }
    }
    else {
        overlayGrid[rowSelected][colSelected] = grid[rowSelected][colSelected];
    }
}

function draw() {
    if (choice === 1) {
        frameUI();
        game();
        debug();
        if (loss) {
            frameRate(1);
            console.log('game is over');
            background('#a3a3a3');
            textSize(48);
            text("YOU LOST", windowW/2, windowH/2);
            timer++;
            if (timer >= 5) {
                location.reload();
            }
        }
    }
}
