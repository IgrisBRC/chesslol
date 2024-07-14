const alphabet = 'abcdefgh'

let squares = document.getElementsByClassName('square')

sync_board()

let previously_highlighted_squares = ['dummy']

for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
        let square = []
        let id = squares[i].id

        square.push(8 - id.charAt(1))
        square.push(id.charAt(0).charCodeAt(0) - 97)

        let moves = move(board, square[0], square[1], to_move)

        for (let i = 0; i < previously_highlighted_squares.length; i++) {
            let prev = document.getElementById(previously_highlighted_squares[i])
            prev.classList.remove('highlight')
        }

        for (let i = 0; i < moves.length; i++) {

            let hlsquare = document.getElementById(`${alphabet[moves[i][1]]}${8 - moves[i][0]}`)

            hlsquare.classList.add('highlight')
            hlsquare.onclick = handle_move(id, hlsquare.id)

            previously_highlighted_squares.push(`${alphabet[moves[i][1]]}${8 - moves[i][0]}`)
        }

        let hlsquare = document.getElementsByClassName('highlight')
        for (let i = 0; i < hlsquare.length; i++) {
        }
    }
}

function handle_move(from_id, id) {
    return function() {
        let table = { 1: 'K', 2: 'Q', 3: 'R', 4: 'B', 5: 'N', 6: 'p' }

        make_move(board, 8 - from_id.charAt(1), from_id.charCodeAt(0) - 97, 8 - id.charAt(1), id.charCodeAt(0) - 97)

        let from_element = document.getElementById(from_id)
        while (from_element.firstChild) {
            from_element.removeChild(from_element.firstChild)
        }

        for (let i = 0; i < previously_highlighted_squares.length; i++) {
            let prev = document.getElementById(previously_highlighted_squares[i])
            prev.classList.remove('highlight')
            prev.onclick = null
        }

        let new_element = document.getElementById(id)
        let piece = document.createElement('p')
        piece.classList.add(board[8 - id.charAt(1)][id.charCodeAt(0) - 97] > 0 ? 'w' : 'b', 'piece')
        new_element.append(piece)
        piece.append(table[Math.abs(board[8 - id.charAt(1)][id.charCodeAt(0) - 97])])

        to_move = !to_move

        console.log(from_id, id)
        console.log(board)
    }
}
