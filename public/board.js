const alphabet = 'abcdefgh'

let squares = document.getElementsByClassName('square')

sync_board()

let previously_highlighted_squares = ['dummy']

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        let square = []
        let id = squares[i].id

        square.push(8 - id.charAt(1))
        square.push(id.charAt(0).charCodeAt(0) - 97)


        let moves = move(board, square[0], square[1])


        for (let i = 0; i < previously_highlighted_squares.length; i++) {
            let prev = document.getElementById(previously_highlighted_squares[i])
            prev.classList.remove('highlight')
        }


        for (let i = 0; i < moves.length; i++) {

            document.getElementById(`${alphabet[moves[i][1]]}${8 - moves[i][0]}`).classList.add('highlight')
            previously_highlighted_squares.push(`${alphabet[moves[i][1]]}${8 - moves[i][0]}`)
        }
    })
}


