const alphabet = 'abcdefgh'

let squares = document.getElementsByClassName('square')

sync_board()

let highlighted_squares = []

for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = handle_highlight(squares[i].id)
}

function handle_highlight(id) {
    return function() {

        let moves = move(board, id.charCodeAt(0) - 48, id.charCodeAt(1) - 48, to_move)

        for (let i = 0; i < highlighted_squares.length; i++) {
            highlighted_squares[i].classList.remove('highlight')
            highlighted_squares[i].onclick = handle_highlight(highlighted_squares[i].id)
        }

        for (let i = 0; i < moves.length; i++) {
            let hlsquare = document.getElementById(`${moves[i][0]}${moves[i][1]}`)

            hlsquare.classList.add('highlight')
            hlsquare.onclick = handle_move(id, hlsquare.id)

            highlighted_squares.push(hlsquare)
        }
    }
}

function handle_move(from_id, to_id) {
    return function() {
        let table = { 1: 'K', 2: 'Q', 3: 'R', 4: 'B', 5: 'N', 6: 'p' }

        make_move(board, from_id.charCodeAt(0) - 48, from_id.charCodeAt(1) - 48, to_id.charCodeAt(0) - 48, to_id.charCodeAt(1) - 48)

        let from_element = document.getElementById(from_id)
        let to_element = document.getElementById(to_id)

        while (from_element.firstChild) {
            from_element.removeChild(from_element.firstChild)
        }

        while (to_element.firstChild) {
            to_element.removeChild(to_element.firstChild)
        }

        let piece = document.createElement('p')
        piece.classList.add(board[to_id.charCodeAt(0) - 48][to_id.charCodeAt(1) - 48] > 0 ? 'w' : 'b', 'piece')
        piece.append(table[Math.abs(board[to_id.charCodeAt(0) - 48][to_id.charCodeAt(1) - 48])])
        to_element.append(piece)

        for (let i = 0; i < highlighted_squares.length; i++) {
            highlighted_squares[i].onclick = handle_highlight(highlighted_squares[i].id)
            highlighted_squares[i].classList.remove('highlight')
        }

        to_move = !to_move
    }
}