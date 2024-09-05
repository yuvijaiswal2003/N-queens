function isSafe(board, row, col, n) {
    // Check this row on left side
    for (let i = 0; i < col; i++)
        if (board[row][i] === 1) return false;

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j] === 1) return false;

    // Check lower diagonal on left side
    for (let i = row, j = col; j >= 0 && i < n; i++, j--)
        if (board[i][j] === 1) return false;

    return true;
}

function solveNQueensUtil(board, col, n, solutions) {
    if (col >= n) {
        let solution = [];
        for (let i = 0; i < n; i++) {
            solution.push([...board[i]]);
        }
        solutions.push(solution);
        return;
    }

    for (let i = 0; i < n; i++) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1;
            solveNQueensUtil(board, col + 1, n, solutions);
            board[i][col] = 0;
        }
    }
}

function solveNQueens() {
    const n = parseInt(document.getElementById("nValue").value);
    if (isNaN(n) || n < 1) {
        alert("Please enter a valid value of N");
        return;
    }

    const board = Array.from({ length: n }, () => Array(n).fill(0));
    const solutions = [];

    solveNQueensUtil(board, 0, n, solutions);
    displaySolutions(solutions, n);
}

function displaySolutions(solutions, n) {
    const solutionCount = document.getElementById("solutionCount");
    const chessboards = document.getElementById("chessboards");
    
    // Clear previous content
    solutionCount.innerHTML = "";
    chessboards.innerHTML = "";

    if (solutions.length === 0) {
        solutionCount.innerHTML = "<p>No solutions found.</p>";
    } else {
        // Display the number of solutions
        solutionCount.innerHTML = `<p>Number of solutions: ${solutions.length}</p>`;
        
        // Add a break or space between the number of solutions and chessboards
        const spacer = document.createElement('div');
        spacer.style.height = '20px'; // Adjust spacing as needed
        chessboards.appendChild(spacer);

        // Display all solutions
        solutions.forEach((solution) => {
            const chessboard = document.createElement("div");
            chessboard.classList.add("chessboard");
            chessboard.style.gridTemplateColumns = `repeat(${n}, 30px)`;

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.classList.add((i + j) % 2 === 0 ? "white" : "black");
                    if (solution[i][j] === 1) {
                        cell.innerHTML = "♛"; // Unicode queen symbol
                    }
                    chessboard.appendChild(cell);
                }
            }

            chessboards.appendChild(chessboard);
        });
    }
}
