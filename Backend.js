const grid = [];
const overlayGrid = [];
const zeroPop = [];
const colors = ['#f5f5f5ff', '#3737ffff', '#136b13ff', '#fd2d2dff', '#000080', '#DC143C', '#008B8B', '#4B0082', '#FF1493', '#500000', '#808080']
let gameChoice = 1;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let rows = getRandomInt(15, 35);
let columns = getRandomInt(15, 35);

function checkSurr(r, c) {
    let val = 0;
    if (grid[r][c] == 0) {
        let rowStart = -1; //the row it starts "scan" at relative to the actual point   
        let rowEnd = 2; //the row it would stop the scan at
        if (r == 0) { //if it's the 0th row, don't try to scan a row above
                rowStart = 0;
        }
        else if (r == (rows - 1)) { //if it's the last row, don't try to scan a row below
            rowEnd = 1;
        }
        for (; rowStart < rowEnd; rowStart++) {
            let colStart = -1;
            let colEnd = 2
            if (c == 0) {
                colStart = 0;
            }
            else if (c == (columns - 1)) {
                colEnd = 1;
            }
            for (; colStart < colEnd; colStart++) {
                if (grid[r + rowStart][c + colStart] === -1) {
                    val++;
                }
            }
        }
        return val;
    }
    else {
        return -1;
    }
}

//Need to populate the grid with ROWS amount of lists, each list with COLUMNS amount of values (0 for now)
for (r = 0; r < rows; r++) {
    console.log("Populating 0'd grid")
    grid[r] = [];
    for (c = 0; c < columns; c++) {
        grid[r][c] = 0;
        if (getRandomInt(0, 8) == 0) {
            grid[r][c] = -1;
        } 
    }
} 

//Need to go to every square, check the 9 squares around it, track mines and change own value. Must deal with edges properly
for (r = 0; r < rows; r++) {
    for (c = 0; c < columns; c++) {
        grid[r][c] = checkSurr(r, c);
    }
}

for (r = 0; r < rows; r++) {
    overlayGrid[r] = [];
    for (c = 0; c < columns; c++) {
        overlayGrid[r][c] = 'hidden';
    }
}

for (r = 0; r < rows; r++) {
    zeroPop[r] = [];
    for (c = 0; c < columns; c++) {
        zeroPop[r][c] = -5;
    }
}

//make that a function ^^^^

console.table(grid);

// document.getElementById("output").innerHTML = grid.join("<br>");
// document.getElementById("overlay").innerHTML = overlayGrid.join("<br>");

