let board = [
    [-3, -5, -4, -2, -1, -4, -5, -3],
    [-6, -6, -6, -6, -6, -6, -6, -6],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [6, 6, 6, 6, 6, 6, 6, 6],
    [3, 5, 4, 2, 1, 4, 5, 3],
]

let to_move = true //white to move
let check = false

//console.log(board[7][1])
//console.log(move(board, 4, 4, to_move))

let castle_white_short = true
let castle_white_long = true
let castle_black_short = true
let castle_black_long = true

let en_passant = -1
let en_passant_move = -1

function check_check(board, to_move) {
    let king_position = []

    if (!to_move) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == 1) {
                    king_position = [i, j]
                    break
                }
            }
        }
    } else {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == -1) {
                    king_position = [i, j]
                    break
                }
            }
        }
    }

    let controlled = controlled_squares(board, !to_move)

    for (let i = 0; i < controlled.length; i++) {
        if (controlled[i][0] == king_position[0] && controlled[i][1] == king_position[1]) {
            return true
        }
    }

    return false
}

function controlled_squares(board, to_move) {
    let squares = []

    if (to_move) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {

                // ignoring the pawn moves here because the pawns cannot capture forward so those squares aren't controlled
                // also ignoring king move, because of unintended recursion
                if (board[i][j] < -1 && board[i][j] > -6) {
                    let moves = move(board, i, j, !to_move)
                    for (let i = 0; i < moves.length; i++) {
                        squares.push(moves[i])
                    }
                }
            }
        }

        //counting only the capturable squares for pawns
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j] == -6 && i + 1 >= 0) {
                    if (j - 1 >= 0) {
                        squares.push([i + 1, j - 1])
                    }
                    if (j + 1 < 8) {
                        squares.push([i + 1, j + 1])
                    }
                }
                if (board[i][j] == -1) {
                    for (let k = i - 1; k <= i + 1; k += 1) {
                        for (let l = j - 1; l <= j + 1; l += 1) {
                            if ((k == i && l == j) || k < 0 || l < 0 || k >= board.length || l >= board[j].length) {
                                continue
                            }
                            if (board[k][l] == 0 || (!to_move ^ board[k][l] > 0)) {
                                squares.push([k, l])
                            }
                        }
                    }
                }
            }
        }

    } else {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] > 1 && board[i][j] < 6) {
                    let moves = move(board, i, j, !to_move)
                    for (let i = 0; i < moves.length; i++) {
                        squares.push(moves[i])
                    }
                }
            }
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j] == 6 && i - 1 < 8) {
                    if (j - 1 >= 0) {
                        squares.push([i - 1, j - 1])
                    }
                    if (j + 1 < 8) {
                        squares.push([i - 1, j + 1])
                    }
                }
                if (board[i][j] == 1) {
                    for (let k = i - 1; k <= i + 1; k += 1) {
                        for (let l = j - 1; l <= j + 1; l += 1) {
                            if ((k == i && l == j) || k < 0 || l < 0 || k >= board.length || l >= board[j].length) {
                                continue
                            }
                            if (board[k][l] == 0 || (!to_move ^ board[k][l] > 0)) {
                                squares.push([k, l])
                            }
                        }
                    }
                }
            }
        }
    }

    return squares
}

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
        } else if (!color && y != 7 && board[y + 1][x] == 0) {
            moves.push([y + 1, x])
        }
    }

    if (color) {
        if (x - 1 >= 0 && board[y - 1][x - 1] < 0 && y - 1 >= 0) {
            moves.push([y - 1, x - 1])
        }
        if (x + 1 <= 7 && board[y - 1][x + 1] < 0 && y - 1 >= 0) {
            moves.push([y - 1, x + 1])
        }
    } else {
        if (x - 1 >= 0 && board[y + 1][x - 1] > 0 && y + 1 <= 7) {
            moves.push([y + 1, x - 1])
        }
        if (x + 1 <= 7 && board[y + 1][x + 1] > 0 && y + 1 <= 7) {
            moves.push([y + 1, x + 1])
        }
    }

    if (en_passant > 0 && color && y == 3) {
        if (x - 1 == en_passant) {
            moves.push([2, x - 1])
        }
        if (x + 1 == en_passant) {
            moves.push([2, x + 1])
        }
    }

    if (en_passant > 0 && !color && y == 4) {
        if (x - 1 == en_passant) {
            moves.push([5, x - 1, 1])
        }
        if (x + 1 == en_passant) {
            moves.push([5, x + 1, 1])
        }
    }

    return moves
}

function king_move(board, y, x) {
    let color = board[y][x] > 0
    let moves = []

    let controlled = controlled_squares(board, to_move)

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

    if (color && castle_white_short && board[7][6] == 0 && board[7][5] == 0) {
        for (let i = 0; i < controlled.length; i++) {
            if ((controlled[i][0] == 7 && controlled[i][1] == 6) || (controlled[i][0] == 7 && controlled[i][1] == 5)) {
                return moves
            }
        }

        moves.push([7, 6])
    }

    if (color && castle_white_long && board[7][2] == 0 && board[7][3] == 0) {
        for (let i = 0; i < controlled.length; i++) {
            if ((controlled[i][0] == 7 && controlled[i][1] == 2) || (controlled[i][0] == 7 && controlled[i][1] == 3)) {
                return moves
            }
        }

        moves.push([7, 2])
    }

    if (!color && castle_black_short && board[0][6] == 0 && board[0][5] == 0) {
        for (let i = 0; i < controlled.length; i++) {
            if ((controlled[i][0] == 0 && controlled[i][1] == 6) || (controlled[i][0] == 0 && controlled[i][1] == 5)) {
                return moves
            }
        }

        moves.push([0, 6])
    }

    if (!color && castle_black_long && board[0][2] == 0 && board[0][3] == 0) {
        for (let i = 0; i < controlled.length; i++) {
            if ((controlled[i][0] == 0 && controlled[i][1] == 2) || (controlled[i][0] == 0 && controlled[i][1] == 3)) {
                return moves
            }
        }

        moves.push([0, 2])
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



