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
        let color = board[prev_y_x[i][0]][prev_y_x[i][1]] > 0

        if(Math.abs(board[prev_y_x[i][0]][prev_y_x[i][1]]) == 1){
            if(color) castle_white_short = castle_white_long = false
            else castle_black_short = castle_black_long = false
        } else if(Math.abs(board[prev_y_x[i][0]][prev_y_x[i][1]]) == 3){
            if(prev_y_x[i][1] == 0){
                if(color) castle_white_long = false
                else castle_black_long = false
            } else if (prev_y_x[i][1] == 7){
                if(color) castle_white_short = false
                else castle_black_short = false
            }
        }

        board[prev_y_x[i][0]][prev_y_x[i][1]] = 0
    }
}

