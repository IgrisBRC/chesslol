const alphabet = 'abcdefgh'

let squares = document.getElementsByClassName('square')

sync_board()

let previously_highlighted_squares = ['dummy']

for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = handle_highlight(squares[i].id)
}

function handle_highlight(id) {
    return function() {


        let moves = move(board, id.charCodeAt(0) - 48, id.charCodeAt(1) - 48, to_move)

        for (let i = 0; i < previously_highlighted_squares.length; i++) {
            //if (previously_highlighted_squares[i] == piece_square) {
            //    continue
            //}

            let prev = document.getElementById(previously_highlighted_squares[i])
            prev.classList.remove('highlight')
            prev.onclick = null
        }

        for (let i = 0; i < moves.length; i++) {
            let hlsquare = document.getElementById(`${moves[i][0]}${moves[i][1]}`)

            hlsquare.classList.add('highlight')
            hlsquare.onclick = handle_move(id, hlsquare.id)

            previously_highlighted_squares.push(`${moves[i][0]}${moves[i][1]}`)
        }
    }
}

function handle_move(from_id, to_id) {
    return function() {
        let table = { 1: 'K', 2: 'Q', 3: 'R', 4: 'B', 5: 'N', 6: 'p' }

        console.log(from_id.charCodeAt(0) - 48, from_id.charCodeAt(1) - 48, to_id.charCodeAt(0) - 48, to_id.charCodeAt(1) - 48)
        make_move(board, from_id.charCodeAt(0) - 48, from_id.charCodeAt(1) - 48, to_id.charCodeAt(0) - 48, to_id.charCodeAt(1) - 48)

        let from_element = document.getElementById(from_id)
        let to_element = document.getElementById(to_id)

        while (from_element.firstChild) {
            from_element.removeChild(from_element.firstChild)
        }

        while (to_element.firstChild) {
            to_element.removeChild(to_element.firstChild)
        }

        for (let i = 0; i < previously_highlighted_squares.length; i++) {
            let prev = document.getElementById(previously_highlighted_squares[i])
            prev.classList.remove('highlight')
            prev.onclick = null
        }

        let piece = document.createElement('p')
        piece.classList.add(board[to_id.charCodeAt(0) - 48][to_id.charCodeAt(1) - 48] > 0 ? 'w' : 'b', 'piece')
        piece.append(table[Math.abs(board[to_id.charCodeAt(0) - 48][to_id.charCodeAt(1) - 48])])
        to_element.append(piece)

        for (let i = 0; i < squares.length; i++) {
            squares[i].onclick = handle_highlight(squares[i].id)
        }

        to_move = !to_move
    }
}

