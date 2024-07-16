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

    for (let i = 0; i < new_y_x.length; i++) {
        board[new_y_x[i][0]][new_y_x[i][1]] = board[prev_y_x[i][0]][prev_y_x[i][1]]
    }

    for (let i = 0; i < prev_y_x.length; i++) {
        board[prev_y_x[i][0]][prev_y_x[i][1]] = 0
    }
}

