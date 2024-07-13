const alphabet = 'abcdefgh'
let squares = document.getElementsByClassName("box")

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let square = document.getElementById(`${alphabet.charAt(j)}${i + 1}`)
        let piece = document.createElement("p")
        piece.classList.add("piece")


        switch (board[i][j]) {
            case 1:
                piece.classList.add("wk")
                square.append(piece)
                piece.append("K")
                break
            case -1:
                piece.classList.add("bk")
                square.append(piece)
                piece.append("K")
                break
            case 2:
                piece.classList.add("wq")
                square.append(piece)
                piece.append("Q")
                break
            case -2:
                piece.classList.add("bq")
                square.append(piece)
                piece.append("Q")
                break
            case 3:
                piece.classList.add("wr")
                square.append(piece)
                piece.append("R")
                break
            case -3:
                piece.classList.add("br")
                square.append(piece)
                piece.append("R")
                break
            case 4:
                piece.classList.add("wb")
                square.append(piece)
                piece.append("B")
                break
            case -4:
                piece.classList.add("bb")
                square.append(piece)
                piece.append("B")
                break
            case 5:
                piece.classList.add("wn")
                square.append(piece)
                piece.append("N")
                break
            case -5:
                piece.classList.add("bn")
                square.append(piece)
                piece.append("N")
                break
            case 6:
                piece.classList.add("wp")
                square.append(piece)
                piece.append("p")
                break
            case -6:
                piece.classList.add("bp")
                square.append(piece)
                piece.append("p")
                break
        }
    }
}

