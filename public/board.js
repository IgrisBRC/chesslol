const alphabet = 'abcdefgh'

let squares = document.getElementsByClassName('square')

sync_board()

let previously_highlighted_squares = ['dummy']

for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = handle_highlight(i)
}

function handle_highlight(i) {
    return function() {

        let id = squares[i].id

        let moves = move(board, id.charCodeAt(0) - 48, id.charCodeAt(1) - 48, to_move)

        for (let i = 0; i < previously_highlighted_squares.length; i++) {
            let prev = document.getElementById(previously_highlighted_squares[i])
            prev.classList.remove('highlight')
            prev.onclick = null
        }

        for (let i = 0; i < moves.length; i++) {
            let hlsquare = document.getElementById(`${moves[i][0]}${moves[i][1]}`)

            hlsquare.classList.add('highlight')

            previously_highlighted_squares.push(`${moves[i][0]}${moves[i][1]}`)
        }

    }
}

//function handle_move(id) {
//    return function() {
//        console.log(id)
//    }
//}
//
