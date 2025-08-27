function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    windowH = windowHeight;
    windowW = windowWidth;
    loss = false;
    timer = 0;
    squareSize = (windowW/2)/columns;
    if (squareSize * rows  > windowH - 140) {
        squareSize = (windowH - 140)/rows;
    }
    hPadding = ((windowW/2) - (columns*squareSize))/2;
    vPadding = ((windowH-140) - (rows*squareSize))/2;
}

document.oncontextmenu = function() { //removes rightclick context menu
        return false;
    }

function frameUI() {    //setup the background frame
    background('#aaaaaaff');
    strokeWeight(.5);
    fill(30);
    rect(windowW/4, 20, windowW/2, windowH - 40);
    fill(55);
    rect(windowW/4, 120, windowW/2, windowH - 140);
    textAlign(CENTER);
    textFont('Verdana', windowW * .03);
    fill(255);
    //ominous timer
    let secondsTotal = Math.round(frameCount/60);
    let minutes = Math.floor(secondsTotal/60);
    let seconds = secondsTotal % 60;
    textFont('Courier New', windowW * .025);
    fill('red');
    if (minutes == 0) {
        text(seconds, windowW/2, 90);
    }
    else if (seconds < 10) {
        text(minutes + ':0' + seconds, windowW/2, 90)
    }
    else {
        text(minutes + ':' + seconds, windowW/2, 90);
    }
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
    for (r = 0; r < rows; r++) {
        for (c = 0; c < columns; c++) {
            if ((windowW/4 + (squareSize * c) + hPadding) < mouseX && mouseX < (windowW/4 + (squareSize * c) + hPadding + squareSize) && (120 + (squareSize * r) + vPadding) < mouseY && mouseY < (120 + (squareSize * r) + vPadding + squareSize)) {
                fill("yellow");
            }
            else {
                fill(colors[overlayGrid[r][c]]);
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
    else if (grid[rowSelected][colSelected] === -1) {
        loss = true;
    }
    else if (grid[rowSelected][colSelected] === 0) {
        for (r = 0; r < rows; r++) {
            for (c = 0; c < columns; c++) {
                if (grid[r][c] === 0) {
                    overlayGrid[r][c] = 0; //FIGURE SOMETHING OUT THIS IS LITERALLY THE LAST STEP
                }
            }
        }
    }
    else {
        overlayGrid[rowSelected][colSelected] = grid[rowSelected][colSelected];
    }
}

function draw() {
    frameUI();
    game();
    //debug();
    if (loss) {
        frameRate(1);
        background('#aaaaaaff');
        textSize(48);
        text("YOU LOST", windowW/2, windowH/2);
        timer++;
        if (timer >= 5) {
            location.reload();
        }  
    }
}
