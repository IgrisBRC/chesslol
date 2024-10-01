const alphabet = 'abcdefgh'

let turn = false

let squares = document.getElementsByClassName('square')

sync_board()

let highlighted_squares = []

//allow ondrop to fire
document.addEventListener("dragover", (e) => e.preventDefault(), false)

function piece_events(e) {
    e.onclick = e.ondragstart = handle_highlight(e)
    e.draggable = true
    e.ondrop = null
}

for (let i = 0; i < squares.length; i++) {
    piece_events(squares[i])
}

function handle_highlight(elem) {
    return function(ev) {
        if (!turn) {
            return
        }

        //validates if square has a piece, and it is it's turn
        if (ev.type === "dragstart") {
            if (!elem || !elem.hasChildNodes() || !elem.children[0].classList.contains(to_move ? "w" : "b"))
                return false
            ev.dataTransfer.setDragImage(elem.children[0], 0, 0);
        }

        let moves = move(board, elem.id.charCodeAt(0) - 48, elem.id.charCodeAt(1) - 48, to_move)

        for (let i = 0; i < highlighted_squares.length; i++) {
            highlighted_squares[i].classList.remove('highlight')
            piece_events(highlighted_squares[i])
        }

        for (let i = 0; i < moves.length; i++) {
            let hlsquare = document.getElementById(`${moves[i][0]}${moves[i][1]}`)

            hlsquare.classList.add('highlight')
            hlsquare.ondrop = handle_move(elem.id, hlsquare.id)
            hlsquare.onclick = handle_move(elem.id, hlsquare.id)

            highlighted_squares.push(hlsquare)
        }
    }
}

function handle_move(from_id, to_id) {
    return function() {
        let table = { 1: 'K', 2: 'Q', 3: 'R', 4: 'B', 5: 'N', 6: 'p' }

        let from_y = from_id.charCodeAt(0) - 48
        let from_x = from_id.charCodeAt(1) - 48

        let to_y = to_id.charCodeAt(0) - 48
        let to_x = to_id.charCodeAt(1) - 48

        let from = board[from_y][from_x]
        let to = board[to_y][to_x]

        let from_color = board[from_y][from_x] > 0
        let to_color = board[to_y][to_x] > 0

        let castle = false
        let castle_rook_move = []

        let prev_y_x = []
        let new_y_x = []

        prev_y_x.push([from_y, from_x])
        new_y_x.push([to_y, to_x])

        if (Math.abs(from) == 1 && to == 0) {
            if (castle_white_short && from_color && to_y == 7 && to_x == 6) { //white short
                prev_y_x.push([7, 7])
                new_y_x.push([7, 5])

                castle_rook_move.push([7, 7])
                castle_rook_move.push([7, 5])

                castle = true
            }

            else if (castle_white_long && from_color && to_y == 7 && to_x == 2) { //white long
                prev_y_x.push([7, 0])
                new_y_x.push([7, 3])

                castle_rook_move.push([7, 0])
                castle_rook_move.push([7, 3])

                castle = true
            }

            else if (castle_black_short && !from_color && to_y == 0 && to_x == 6) { //black short
                prev_y_x.push([0, 7])
                new_y_x.push([0, 5])

                castle_rook_move.push([0, 7])
                castle_rook_move.push([0, 5])

                castle = true
            }

            else if (castle_black_long && !from_color && to_y == 0 && to_x == 2) { //black long
                prev_y_x.push([0, 0])
                new_y_x.push([0, 3])

                castle_rook_move.push([0, 0])
                castle_rook_move.push([0, 3])

                castle = true
            }
        }

        make_move(board, prev_y_x, new_y_x)

        if (en_passant_move >= 0) {
            if (from_color) {
                let passanted_pawn = document.getElementById(`3${en_passant_move}`)

                while (passanted_pawn.firstChild) {
                    passanted_pawn.removeChild(passanted_pawn.firstChild)
                }
            } else {
                let passanted_pawn = document.getElementById(`4${en_passant_move}`)

                while (passanted_pawn.firstChild) {
                    passanted_pawn.removeChild(passanted_pawn.firstChild)
                }
            }

            en_passant_move = -1
        }

        let from_element = document.getElementById(from_id)
        let to_element = document.getElementById(to_id)

        while (from_element.firstChild) {
            from_element.removeChild(from_element.firstChild)
        }

        while (to_element.firstChild) {
            to_element.removeChild(to_element.firstChild)
        }

        if (castle) {
            let from_element = document.getElementById(`${castle_rook_move[0][0]}${castle_rook_move[0][1]}`)
            let to_element = document.getElementById(`${castle_rook_move[1][0]}${castle_rook_move[1][1]}`)

            while (from_element.firstChild) {
                from_element.removeChild(from_element.firstChild)
            }

            while (to_element.firstChild) {
                to_element.removeChild(to_element.firstChild)
            }

            let piece = document.createElement('p')

            piece.classList.add(board[castle_rook_move[1][0]][castle_rook_move[1][1]] > 0 ? 'w' : 'b', 'piece')
            piece.append(table[Math.abs(board[castle_rook_move[1][0]][castle_rook_move[1][1]])])
            to_element.append(piece)
        }

        let piece = document.createElement('p')
        piece.classList.add(board[to_y][to_x] > 0 ? 'w' : 'b', 'piece')
        piece.append(table[Math.abs(board[to_y][to_x])])
        to_element.append(piece)

        for (let i = 0; i < highlighted_squares.length; i++) {
            //highlighted_squares[i].onclick = handle_highlight(highlighted_squares[i].id)
            piece_events(highlighted_squares[i])
            highlighted_squares[i].classList.remove('highlight')
        }

        to_move = !to_move
    }
}

