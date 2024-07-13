const alphabet = 'abcdefgh'
//let squares = document.getElementsByClassName("square")


for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let square = document.getElementById(`${alphabet.charAt(j)}${i + 1}`)
        //console.log(square)

        square.append("p")
    }
}

