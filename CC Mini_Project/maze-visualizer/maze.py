import random
import json
from collections import deque

ROWS, COLS = 21, 21

# Create full wall grid
maze = [[1 for _ in range(COLS)] for _ in range(ROWS)]

# Directions (2-step movement)
DIRS = [(0,2), (2,0), (0,-2), (-2,0)]

# -------- DFS MAZE GENERATION --------
def generate_maze():
    stack = [(1,1)]
    maze[1][1] = 0

    while stack:
        r, c = stack[-1]

        neighbors = []
        for dr, dc in DIRS:
            nr, nc = r + dr, c + dc
            if 1 <= nr < ROWS-1 and 1 <= nc < COLS-1:
                if maze[nr][nc] == 1:
                    neighbors.append((nr, nc, dr, dc))

        if not neighbors:
            stack.pop()
            continue

        nr, nc, dr, dc = random.choice(neighbors)

        maze[r + dr//2][c + dc//2] = 0
        maze[nr][nc] = 0

        stack.append((nr, nc))

# -------- BFS SOLVER --------
def solve_maze():
    queue = deque([(1,1)])
    visited = [[False]*COLS for _ in range(ROWS)]
    parent = {}

    steps = []

    while queue:
        r, c = queue.popleft()

        if visited[r][c] or maze[r][c] == 1:
            continue

        visited[r][c] = True
        steps.append({"r": r, "c": c, "type": "visit"})

        if (r, c) == (ROWS-2, COLS-2):
            break

        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < ROWS and 0 <= nc < COLS:
                if not visited[nr][nc]:
                    parent[(nr, nc)] = (r, c)
                    queue.append((nr, nc))

    # -------- BACKTRACK PATH --------
    path = []
    cur = (ROWS-2, COLS-2)

    while cur in parent:
        path.append({"r": cur[0], "c": cur[1], "type": "path"})
        cur = parent[cur]

    path.append({"r": 1, "c": 1, "type": "path"})
    path.reverse()

    return steps, path


# -------- MAIN --------
generate_maze()
steps, path = solve_maze()

with open("maze_data.json", "w") as f:
    json.dump({
        "maze": maze,
        "steps": steps,
        "path": path
    }, f, indent=2)

print("✅ maze_data.json created")