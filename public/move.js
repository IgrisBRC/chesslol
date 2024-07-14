let board = [
    [-3, -5, -4, -2, -1, -4, -5, -3],
    [-6, -6, -6, -6, -6, -6, -6, -6],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [6, 6, 6, 6, 6, 6, 6, 6],
    [3, 5, 4, 2, 1, 4, 5, 3],
]

let to_move = true

//console.log(move(board, 4, 3))
//move(board, 3, 3)

function move(board, y, x, to_move) {
    if (to_move ^ board[y][x] > 0) {
        return []
    }

    let piece = Math.abs(board[y][x])
    switch (piece) {
        case 0:
            return []
        case 1:
            return king_move(board, y, x)
        case 2:
            return amelia_move(board, y, x)
        case 3:
            return rook_move(board, y, x)
        case 4:
            return bishop_move(board, y, x)
        case 5:
            return knight_move(board, y, x)
        case 6:
            return pawn_move(board, y, x)
    }
}

function pawn_move(board, y, x) {
    let moves = []
    let color = board[y][x] > 0

    if (color) {
        if (y == 6) {
            if (board[y - 1][x] == 0) {
                moves.push([y - 1, x])
            }
            else {
                return moves
            }
            if (board[y - 2][x] == 0) {
                moves.push([y - 2, x])
            }
        } else if (color && y != 0 && board[y - 1][x] == 0) {
            moves.push([y - 1, x])
        }

        return moves
    } else {
        if (y == 1) {
            if (board[y + 1][x] == 0) {
                moves.push([y + 1, x])
            }
            else {
                return moves
            }
            if (board[y + 2][x] == 0) {
                moves.push([y + 2, x])
            }
        } else if (color && y != 7 && board[y + 1][x] == 0) {
            moves.push([y + 1, x])
        }
        return moves
    }
}

function king_move(board, y, x) {
    let color = board[y][x] > 0
    let moves = []

    for (let i = y - 1; i <= y + 1; i += 1) {
        for (let j = x - 1; j <= x + 1; j += 1) {
            if ((i == y && j == x) || i < 0 || j < 0 || i >= board.length || j >= board[i].length) {
                continue
            }
            if (board[i][j] == 0 || (color ^ board[i][j] > 0)) {
                moves.push([i, j])
            }
        }
    }

    return moves
}

function knight_move(board, y, x) {
    let color = board[y][x] > 0
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

        if (board[cand[k][0]][cand[k][1]] == 0 || (color ^ board[cand[k][0]][cand[k][1]] > 0)) {
            moves.push([cand[k][0], cand[k][1]])
        }
    }

    return moves
}


function rook_move(board, y, x) {
    let color = board[y][x] > 0
    let moves = []

    for (let i = x + 1; i < board[1].length; i++) {
        if (board[y][i] != 0) {
            if (color ^ board[y][i] > 0) {
                console.log(color ^ board[y][i])
                moves.push([y, i])
                break
            }
            break
        }
        moves.push([y, i])
    }

    for (let i = x - 1; i >= 0; i--) {
        if (board[y][i] != 0) {
            if (color ^ board[y][i] > 0) {
                moves.push([y, i])
                break
            }
            break
        }
        moves.push([y, i])
    }


    for (let i = y + 1; i < board.length; i++) {
        if (board[i][x] != 0) {
            if (color ^ board[i][x] > 0) {
                moves.push([i, x])
                break
            }
            break
        }
        moves.push([i, x])
    }

    for (let i = y - 1; i >= 0; i--) {
        if (board[i][x] != 0) {
            if (color ^ board[i][x] > 0) {
                moves.push([i, x])
                break
            }
            break
        }
        moves.push([i, x])
    }

    return moves
}

function bishop_move(board, y, x) {
    let color = board[y][x] > 0
    let moves = []

    let i = y + 1
    let j = x + 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            if (color ^ board[i][j] > 0) {
                moves.push([i, j])
                break
            }
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
            if (color ^ board[i][j] > 0) {
                moves.push([i, j])
                break
            }
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
            if (color ^ board[i][j] > 0) {
                moves.push([i, j])
                break
            }
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
            if (color ^ board[i][j] > 0) {
                moves.push([i, j])
                break
            }
            break
        }

        moves.push([i, j])
        i += 1
        j -= 1
    }

    return moves
}

function amelia_move(board, y, x) {
    let color = board[y][x] > 0
    let moves = []

    for (let i = x + 1; i < board[1].length; i++) {
        if (board[y][i] != 0) {
            if (color ^ board[y][i] > 0) {
                console.log(color ^ board[y][i])
                moves.push([y, i])
                break
            }
            break
        }
        moves.push([y, i])
    }

    for (let i = x - 1; i >= 0; i--) {
        if (board[y][i] != 0) {
            if (color ^ board[y][i] > 0) {
                moves.push([y, i])
                break
            }
            break
        }
        moves.push([y, i])
    }


    for (let i = y + 1; i < board.length; i++) {
        if (board[i][x] != 0) {
            if (color ^ board[i][x] > 0) {
                moves.push([i, x])
                break
            }
            break
        }
        moves.push([i, x])
    }

    for (let i = y - 1; i >= 0; i--) {
        if (board[i][x] != 0) {
            if (color ^ board[i][x] > 0) {
                moves.push([i, x])
                break
            }
            break
        }
        moves.push([i, x])
    }
    let i = y + 1
    let j = x + 1

    while (!(i < 0 || j < 0 || i >= board.length || j >= board[i].length)) {
        if (board[i][j] != 0) {
            if (color ^ board[i][j] > 0) {
                moves.push([i, j])
                break
            }
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
            if (color ^ board[i][j] > 0) {
                moves.push([i, j])
                break
            }
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
            if (color ^ board[i][j] > 0) {
                moves.push([i, j])
                break
            }
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
            if (color ^ board[i][j] > 0) {
                moves.push([i, j])
                break
            }
            break
        }

        moves.push([i, j])
        i += 1
        j -= 1
    }
    return moves
}

