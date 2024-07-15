function sync_board() {
    
    let table = { 1: 'K', 2: 'Q', 3: 'R', 4: 'B', 5: 'N', 6: 'p' }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] == 0) continue

            let square = document.getElementById(`${i}${j}`)
            let piece = document.createElement('p')

            piece.classList.add(board[i][j] > 0 ? 'w' : 'b', 'piece')
            square.append(piece)
            piece.append(table[Math.abs(board[i][j])])
        }
    }
}
