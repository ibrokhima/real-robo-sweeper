const grid = [];
const colors = ['#FFFAF0', '#3737ffff', '#136b13ff', '#fd2d2dff', '#000080', '#DC143C', '#008B8B', '#4B0082', '#FF1493']

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let rows = getRandomInt(10, 50);
let columns = getRandomInt(10, 50);

function checkSurr(r, c) {
    if (grid[r][c] == 0) {
        let rowScn = -1;
        let val = 0;
        let rScn = 2; //the row it would stop the scan at (row would be rScn - 1)
        if (r == 0) {
                rowScn = 0;
        }
        else if (r == (rows - 1)) {
            rScn = 1;
        }
        for (; rowScn < rScn; rowScn++) {
            console.log("rowscn", rowScn);
            let colScn = -1;
            let cScn = 2
            if (c == 0) {
                colScn = 0;
            }
            else if (c == (columns - 1)) {
                cScn = 1;
            }
            for (; colScn < cScn; colScn++) {
                if (grid[r + rowScn][c + colScn] === -1) {
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
for (i = 0; i < rows; i++) {
    console.log("Populating 0'd grid")
    grid[i] = [];
    for (c = 0; c < columns; c++) {
        grid[i][c] = 0;
        if (getRandomInt(0, 9) == 0) {
            grid[i][c] = -1;
        } 
    }
} 

//Need to go to every square, check the 9 squares around it, track mines and change own value. Must deal with edges properly
for (r = 0; r < rows; r++) {
    for (c = 0; c < columns; c++) {
        console.log("r:", r, "c:", c);
        console.log(checkSurr(r, c));
        grid[r][c] = checkSurr(r, c);
    }
}


console.log("heyy");
console.table(grid);

document.getElementById("output").innerHTML = grid.join("<br>");

