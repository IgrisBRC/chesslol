function make_move(board, y ,x, new_y, new_x) {
    board[new_y][new_x] = board[y][x]
    board[y][x] = 0
}

