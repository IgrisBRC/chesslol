

let board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, -1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]

console.log(board.length)

console.log(pawn_move(board, 1, 1))

function pawn_move(board, y, x) {
    let moves = []

    if (board[y][x] > 0) {
        if (y == 6) {
            moves.push([y - 1, x])
            moves.push([y - 2, x])
            return moves
        }

        moves.push([y - 1, x])
        return moves
    } else {
        if (y == 1) {
            moves.push([y + 1, x])
            moves.push([y + 2, x])
            return moves
        }

        moves.push([y + 1, x])
        return moves

    }
}

function king_move(board, y, x) {
    let moves = []

    for (let i = y - 1; i <= y + 1; i += 1) {
        for (let j = x - 1; j <= x + 1; j += 1) {
            if ((i == y && j == x) || i < 0 || j < 0 || i >= board.length || j >= board[i].length) {
                continue
            }
            if (board[i][j] == 0) {
                moves.push([i, j])
            }
        }
    }

    return moves
}

function knight_move(board, y, x) {
    let moves = []

    let cand = [
        [y + 2, x + 1],
        [y + 2, x - 1],
        [y + 1, x - 2],
        [y + 1, x + 2],
        [y - 2, x + 1],
        [y - 2, x - 1],
        [y - 1, x + 2],
        [y - 1, x - 2],
    ]

    for (let k = 0; k < cand.length; k++) {
        if (cand[k][0] < 0 || cand[k][1] < 0 || cand[k][0] >= board.length || cand[k][1] >= board[cand[k][0]].length) {
            continue
        }

        if (board[i][j] == 0) {
            moves.push([i, j])
        }
    }

    return moves
}


function rook_move(board, y, x) {
    let moves = []

    for (let i = x + 1; i < board[1].length; i++) {
        if (board[y][i] != 0) {
            break
        }
        moves.push([y, i])
    }

    for (let i = x - 1; i >= 0; i--) {
        if (board[y][i] != 0) {
            break
        }
        moves.push([y, i])
    }


    for (let i = y + 1; i < board.length; i++) {
        if (board[i][x] != 0) {
            break
        }
        moves.push([i, x])
    }

    for (let i = y - 1; i >= 0; i--) {
        if (board[i][x] != 0) {
            break
        }
        moves.push([i, x])
    }

    return moves
}

function bishop_move(board, y, x) {
    let moves = []

    let i = y + 1
    let j = x + 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            break
        }

        moves.push([i, j])
        i += 1
        j += 1
    }

    i = y - 1
    j = x - 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            break
        }

        moves.push([i, j])
        i -= 1
        j -= 1
    }

    i = y - 1
    j = x + 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            break
        }

        moves.push([i, j])
        i -= 1
        j += 1
    }

    i = y + 1
    j = x - 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            break
        }

        moves.push([i, j])
        i += 1
        j -= 1
    }

    return moves
}

function amelia_move(board, y, x) {
    let moves = []

    for (let i = x + 1; i < board[0].length; i++) {
        if (board[y][i] != 0) {
            break
        }
        moves.push([y, i])
    }

    for (let i = x - 1; i >= 0; i--) {
        if (board[y][i] != 0) {
            break
        }
        moves.push([y, i])
    }


    for (let i = y + 1; i < board.length; i++) {
        if (board[i][x] != 0) {
            break
        }
        moves.push([i, x])
    }

    for (let i = y - 1; i >= 0; i--) {
        if (board[i][x] != 0) {
            break
        }
        moves.push([i, x])
    }

    let i = y + 1
    let j = x + 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            break
        }

        moves.push([i, j])
        i += 1
        j += 1
    }

    i = y - 1
    j = x - 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            break
        }

        moves.push([i, j])
        i -= 1
        j -= 1
    }

    i = y - 1
    j = x + 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            break
        }

        moves.push([i, j])
        i -= 1
        j += 1
    }

    i = y + 1
    j = x - 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            break
        }

        moves.push([i, j])
        i += 1
        j -= 1
    }

    return moves
}
