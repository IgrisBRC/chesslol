const alphabet = 'abcdefgh'

let board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
]

for (let i = 0; i < 8; i ++) {
    for (let j = 0; j < 8; j ++) {
        let square = document.getElementById(`${alphabet.charAt(j)}${i+1}`)
        switch (board[i][j]) {
            case 1:
                square.append("p")
                break
            case -1:
                square.append("p")
                break
        }
    }
}
