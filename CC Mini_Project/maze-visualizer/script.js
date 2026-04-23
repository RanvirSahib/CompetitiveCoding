let grid = [];
let container = document.getElementById("grid");

let rows = 21;
let cols = 21;

let start = null;
let end = null;
let mazeData = null;

// Set grid layout
container.style.display = "grid";
container.style.gridTemplateColumns = `repeat(${cols}, 25px)`;

// Load maze ONCE
async function loadMaze() {
    let res = await fetch("./maze_data.json");
    let data = await res.json();
    mazeData = data.maze;
    createGrid(mazeData);
}

// Create grid
function createGrid(maze) {
    container.innerHTML = "";
    grid = [];

    for (let r = 0; r < rows; r++) {
        let row = [];

        for (let c = 0; c < cols; c++) {
            let cell = document.createElement("div");

            cell.style.width = "25px";
            cell.style.height = "25px";
            cell.style.border = "1px solid #222";

            if (maze[r][c] === 1) {
                cell.style.background = "black";
            } else {
                cell.style.background = "#1e293b";
            }

            // Click to set start/end
            cell.onclick = () => {
                if (maze[r][c] === 1) return;

                if (!start) {
                    start = [r, c];
                    cell.style.background = "green";
                } else if (!end) {
                    end = [r, c];
                    cell.style.background = "red";
                }
            };

            container.appendChild(cell);
            row.push(cell);
        }

        grid.push(row);
    }
}

// Solve maze (BFS)
async function solveMaze() {
    if (!start || !end) {
        alert("Select start and end first from Maze!");
        return;
    }

    let queue = [start];
    let visited = new Set();
    let parent = {};

    let key = (r, c) => `${r},${c}`;
    visited.add(key(start[0], start[1]));

    while (queue.length) {
        let [r, c] = queue.shift();

        if (r === end[0] && c === end[1]) break;

        let moves = [[1,0],[-1,0],[0,1],[0,-1]];

        for (let [dr, dc] of moves) {
            let nr = r + dr;
            let nc = c + dc;

            if (
                nr >= 0 && nc >= 0 &&
                nr < rows && nc < cols &&
                mazeData[nr][nc] === 0 &&
                !visited.has(key(nr,nc))
            ) {
                visited.add(key(nr,nc));
                parent[key(nr,nc)] = [r,c];

                grid[nr][nc].style.background = "blue";

                queue.push([nr,nc]);
                await new Promise(r => setTimeout(r, 10));
            }
        }
    }

    // Backtrack path
    let cur = end;
    while (cur && key(cur[0],cur[1]) !== key(start[0],start[1])) {
        let [r,c] = cur;
        grid[r][c].style.background = "yellow";
        cur = parent[key(r,c)];
        await new Promise(r => setTimeout(r, 20));
    }
}

// Reset only colors (not maze)
function resetGrid() {
    start = null;
    end = null;

    createGrid(mazeData);
}

// Button
function generateMaze() {
    alert("Run python maze.py again if needed");
}

// Load maze on page start
loadMaze();