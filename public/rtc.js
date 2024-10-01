const configuration = {
    iceServers: [{ "urls": "stun:stun.l.google.com:19302" }]
}

function ice_canidate(pc) {
    return new Promise((res) => {
        pc.onicegatheringstatechange = () => {
            const state = pc.iceGatheringState
            console.log('state:', state)
            if (state == "complete")
                res()
        }
    })
}

let rtc_data

class P2P {
    dc_hooks() {
        this.dc.onopen = () => {
            console.log("datachannel is opened")
            document.getElementById("rtc-window").style.visibility = "hidden"
        }
        this.dc.onmessage = (e) => {
            console.log("received:", e.data)
            rtc_data = e.data

            if (rtc_data.length == 7) {
                let from_id = "" + rtc_data[0] + rtc_data[2]
                let to_id = "" + rtc_data[4] + rtc_data[6]

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

                make_move_opp(board, prev_y_x, new_y_x)

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
            } else {
                let from_id = "" + rtc_data[0] + rtc_data[2]
                let to_id = "" + rtc_data[8] + rtc_data[10]

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

                make_move_opp(board, prev_y_x, new_y_x)

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

            turn = true
        }
    }

    constructor() {
        this.pc = new RTCPeerConnection(configuration)
        this.dc = this.pc.createDataChannel('channel')
        this.dc_hooks()
    }

    async create() {
        const offer = await this.pc.createOffer()
        await this.pc.setLocalDescription(offer)
        await ice_canidate(this.pc)

        return (encodeURI(JSON.stringify(this.pc.localDescription)))
    }

    async offer(offer) {
        this.pc.ondatachannel = (e) => {
            this.pc.dc = this.dc = e.channel
            this.dc_hooks()
        }

        this.pc.setRemoteDescription(JSON.parse(decodeURI(offer)))

        const answer = await this.pc.createAnswer()
        await this.pc.setLocalDescription(answer)
        await ice_canidate(this.pc)
        turn = false
        return (encodeURI(JSON.stringify(this.pc.localDescription)))
    }

    async answer(answer) {
        this.pc.setRemoteDescription(JSON.parse(decodeURI(answer)))
        turn = true
    }
}

let player = new P2P()
