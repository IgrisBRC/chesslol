
function sync_board() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let square = document.getElementById(`${alphabet.charAt(j)}${8 - i}`)
            let piece = document.createElement('p')

            piece.classList.add('piece')

            switch (board[i][j]) {
                case 1:
                    piece.classList.add('w')
                    square.append(piece)
                    piece.append('K')
                    break
                case -1:
                    piece.classList.add('b')
                    square.append(piece)
                    piece.append('K')
                    break
                case 2:
                    piece.classList.add('w')
                    square.append(piece)
                    piece.append('Q')
                    break
                case -2:
                    piece.classList.add('b')
                    square.append(piece)
                    piece.append('Q')
                    break
                case 3:
                    piece.classList.add('w')
                    square.append(piece)
                    piece.append('R')
                    break
                case -3:
                    piece.classList.add('b')
                    square.append(piece)
                    piece.append('R')
                    break
                case 4:
                    piece.classList.add('w')
                    square.append(piece)
                    piece.append('B')
                    break
                case -4:
                    piece.classList.add('b')
                    square.append(piece)
                    piece.append('B')
                    break
                case 5:
                    piece.classList.add('w')
                    square.append(piece)
                    piece.append('N')
                    break
                case -5:
                    piece.classList.add('b')
                    square.append(piece)
                    piece.append('N')
                    break
                case 6:
                    piece.classList.add('w')
                    square.append(piece)
                    piece.append('p')
                    break
                case -6:
                    piece.classList.add('b')
                    square.append(piece)
                    piece.append('p')
                    break
            }
        }
    }

}
