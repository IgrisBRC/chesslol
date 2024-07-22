//function make_move(board, y, x, new_y, new_x) {
//
//    board[new_y][new_x] = board[y][x]
//    board[y][x] = 0
//
//    check = check_check(board, to_move, check)
//
//    if (check) {
//        console.log("check")
//    }
//}

function make_move(board, prev_y_x, new_y_x) {

    if ((board[prev_y_x[0][0]][prev_y_x[0][1]] == 6 || board[prev_y_x[0][0]][prev_y_x[0][1]] == -6) && board[new_y_x[0][0]][new_y_x[0][1]] == 0 && new_y_x[0][1] != prev_y_x[0][1]) {
        if (board[prev_y_x[0][0]][prev_y_x[0][1]] == 6) {
            board[3][en_passant] = 0
        } else {
            board[4][en_passant] = 0
        }

        en_passant_move = en_passant
    }

    en_passant = -1

    for (let i = 0; i < new_y_x.length; i++) {
        if (board[prev_y_x[i][0]][prev_y_x[i][1]] == 6 && prev_y_x[i][0] - new_y_x[i][0] == 2) {
            en_passant = prev_y_x[i][1]
        }

        if (board[prev_y_x[i][0]][prev_y_x[i][1]] == -6 && prev_y_x[i][0] - new_y_x[i][0] == -2) {
            en_passant = prev_y_x[i][1]
        }

        board[new_y_x[i][0]][new_y_x[i][1]] = board[prev_y_x[i][0]][prev_y_x[i][1]]
    }

    for (let i = 0; i < prev_y_x.length; i++) {
        let color = board[prev_y_x[i][0]][prev_y_x[i][1]] > 0

        if (Math.abs(board[prev_y_x[i][0]][prev_y_x[i][1]]) == 1) {
            if (color) castle_white_short = castle_white_long = false
            else castle_black_short = castle_black_long = false
        } else if (Math.abs(board[prev_y_x[i][0]][prev_y_x[i][1]]) == 3) {
            if (prev_y_x[i][1] == 0) {
                if (color) castle_white_long = false
                else castle_black_long = false
            } else if (prev_y_x[i][1] == 7) {
                if (color) castle_white_short = false
                else castle_black_short = false
            }
        }

        board[prev_y_x[i][0]][prev_y_x[i][1]] = 0
    }

    if (board[new_y_x[0][0]][new_y_x[0][1]] == 6 && new_y_x[0][0] == 0 || board[new_y_x[0][0]][new_y_x[0][1]] == -6 && new_y_x[0][0] == 7) {
        let color = board[new_y_x[0][0]][new_y_x[0][1]] > 0
        handle_promotion(color, new_y_x[0][0], new_y_x[0][1])
    }

    check = check_check(board, to_move, check)
    if (check) {
        console.log("check")
    }
}

function handle_promotion(color, y, x) {
    let promotion_window = document.getElementById('promotion-window')
    promotion_window.style.visibility = "visible"

    let queen_option = document.getElementById('queen')

    queen_option.onclick = () => {
        let promotion_piece = color ? 2 : -2
        board[y][x] = promotion_piece
        promotion_window.style.visibility = "hidden"

        let to_element = document.getElementById(`${y}${x}`)
        while (to_element.firstChild) {
            to_element.removeChild(to_element.firstChild)
        }

        let piece = document.createElement('p')

        piece.classList.add(promotion_piece > 0 ? 'w' : 'b', 'piece')
        piece.append('Q')
        to_element.append(piece)
        return
    }

    let rook_option = document.getElementById('rook')

    rook_option.onclick = () => {
        let promotion_piece = color ? 3 : -3
        board[y][x] = promotion_piece
        promotion_window.style.visibility = "hidden"

        let to_element = document.getElementById(`${y}${x}`)
        while (to_element.firstChild) {
            to_element.removeChild(to_element.firstChild)
        }

        let piece = document.createElement('p')

        piece.classList.add(promotion_piece > 0 ? 'w' : 'b', 'piece')
        piece.append('R')
        to_element.append(piece)
        return
    }

    let bishop_option = document.getElementById('bishop')

    bishop_option.onclick = () => {
        let promotion_piece = color ? 4 : -4
        board[y][x] = promotion_piece
        promotion_window.style.visibility = "hidden"

        let to_element = document.getElementById(`${y}${x}`)
        while (to_element.firstChild) {
            to_element.removeChild(to_element.firstChild)
        }

        let piece = document.createElement('p')

        piece.classList.add(promotion_piece > 0 ? 'w' : 'b', 'piece')
        piece.append('B')
        to_element.append(piece)
        return
    }

    let knight_option = document.getElementById('knight')

    knight_option.onclick = () => {
        let promotion_piece = color ? 5 : -5
        board[y][x] = promotion_piece
        promotion_window.style.visibility = "hidden"

        let to_element = document.getElementById(`${y}${x}`)
        while (to_element.firstChild) {
            to_element.removeChild(to_element.firstChild)
        }

        let piece = document.createElement('p')

        piece.classList.add(promotion_piece > 0 ? 'w' : 'b', 'piece')
        piece.append('N')
        to_element.append(piece)
        return
    }
}
