function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#aaaaaaff');
    frameRate(30);
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

function frameUI() { //setup the background frame
    strokeWeight(1);
    fill(30);
    rect(windowW/4, 20, windowW/2, windowH - 40);
    fill(45);
    rect(windowW/4, 120, windowW/2, windowH - 140);
    textAlign(LEFT, BASELINE);
    fill(255);
    textFont('Arial', windowW * .015);
    text('Mines: ' + mines, windowW/4 + 10, 60);
    //ominous timer
    let secondsTotal = Math.round(frameCount/30);
    let minutes = Math.floor(secondsTotal/60);
    let seconds = secondsTotal % 60;
    textFont('Courier New', windowW * .025);
    textAlign(CENTER, BASELINE);
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

function game() { //generate the grid
    strokeWeight(.75);
    for (r = 0; r < rows; r++) {
        for (c = 0; c < columns; c++) {
            if ((windowW/4 + (squareSize * c) + hPadding) < mouseX && mouseX < (windowW/4 + (squareSize * c) + hPadding + squareSize) && (120 + (squareSize * r) + vPadding) < mouseY && mouseY < (120 + (squareSize * r) + vPadding + squareSize)) {
                fill("yellow");
                rect(windowW/4 + (squareSize * c) + hPadding, 120 + (squareSize * r) + vPadding, squareSize, squareSize);
            }
            else if (overlayGrid[r][c] == 'flag') {
                fill(colors[9]);
                rect(windowW/4 + (squareSize * c) + hPadding, 120 + (squareSize * r) + vPadding, squareSize, squareSize);
            }
            else if (overlayGrid[r][c] == 'shown') {
                fill(colors[grid[r][c]]);
                rect(windowW/4 + (squareSize * c) + hPadding, 120 + (squareSize * r) + vPadding, squareSize, squareSize);
                if (grid[r][c] != 0) {
                    fill(0);
                    textAlign(CENTER, CENTER);
                    textFont('Verdana', squareSize/1.3);
                    text(grid[r][c], windowW/4 + (squareSize * c) + hPadding + squareSize/2, 120 + (squareSize * r) + vPadding + squareSize/1.75);
                }
            }
            else {
                fill(colors[10]);
                rect(windowW/4 + (squareSize * c) + hPadding, 120 + (squareSize * r) + vPadding, squareSize, squareSize);
            }
        }
    }
}

function findItem(matrix, LF) {
    if (LF === -1) {
        return;
    }
    else {
        for (let i = 0; i < matrix.length; i++) {
            rowLF = matrix[i];
            colLF = rowLF.indexOf(LF);
            if (colLF !== -1) {
                return [i, colLF];    
            }
        }
    }
}

function flood(rowSelectedF, colSelectedF, breadthFlag) {
    if (grid[rowSelectedF][colSelectedF] === 0) {
        zeroPop[rowSelectedF][colSelectedF] = breadthFlag;
        let rowStart = colStart = -1;
        let rowEnd = colEnd = 1;
        if (rowSelectedF === 0) {
            rowStart = 0; 
        }
        else if (rowSelectedF === rows - 1) {
            rowEnd = 0;
        }
        if (colSelectedF === 0) {
            colStart = 0;
        } 
        else if (colSelectedF === columns - 1) {
            colEnd = 0;
        }
        for (rr = rowStart; rr <= rowEnd; rr++) {
            for (cc = colStart; cc <= colEnd; cc++) {
                overlayGrid[rowSelectedF + rr][colSelectedF + cc] = 'shown';
            }
        }
        for (rr = rowStart; rr <= rowEnd; rr++) {
            for (cc = colStart; cc <= colEnd; cc++) {
                if (grid[rowSelectedF + rr][colSelectedF + cc] === 0 && zeroPop[rowSelectedF + rr][colSelectedF + cc] < 0) {
                    flood(rowSelectedF + rr, colSelectedF + cc, breadthFlag + 1);
                }
            }
        }
        let lastBreadth = findItem(zeroPop, breadthFlag - 1);
        if (lastBreadth != undefined) {
            flood(lastBreadth[0], lastBreadth[1], breadthFlag);
        }
    }
}

function mousePressed() {
    rowSelected = Math.floor((mouseY - 120 - vPadding)/squareSize);
    colSelected = Math.floor((mouseX - windowW/4 - hPadding)/squareSize);
    console.log(rowSelected + '<-row | col->' + colSelected);
    if (mouseButton === RIGHT) {
        if (overlayGrid[rowSelected][colSelected] === 'hidden') {
            overlayGrid[rowSelected][colSelected] = 'flag';
            mines--;
        }
        else if (overlayGrid[rowSelected][colSelected] === 'flag') {
            overlayGrid[rowSelected][colSelected] = 'hidden';
            mines++;
        }
    }
    else if (grid[rowSelected][colSelected] === -1) {
        loss = true;
    }
    else if (grid[rowSelected][colSelected] === 0) {
        for (r = 0; r < rows; r++) {
            for (c = 0; c < columns; c++) {
                zeroPop[r][c] = -1;
            }
        }
        flood(rowSelected, colSelected, 0);
    }
    else {
        overlayGrid[rowSelected][colSelected] = 'shown';
    }
}

function draw() {
    if (loss) {
        frameRate(1);
        background('#aaaaaaff');
        textFont('Verdana', 64);
        textAlign(CENTER, BASELINE);
        fill(0);
        text("YOU LOST", windowW/2, windowH/2);
        timer++;
        if (timer >= 3) {
            location.reload();
        }  
    }
    else {
        frameUI();
        game();
        //debug();
    }
}
