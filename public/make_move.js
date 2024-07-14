function make_move(board, y ,x, new_y, new_x) {
    let temp = board[y][x]
    board[y][x] = 0
    board[new_y][new_x] = temp
}
