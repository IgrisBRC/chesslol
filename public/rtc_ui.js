
let created_offer = document.getElementById("created-offer")
let created_answer = document.getElementById("created-answer")

let offer = document.getElementById("offer")
let answer = document.getElementById("answer")

let make_offer_button = document.getElementById("make-offer")
let take_offer_button = document.getElementById("take-offer")
let take_answer_button = document.getElementById("take-answer")

make_offer_button.onclick = async function() {
    created_offer.value = await player.create()
}

take_offer_button.onclick = async function() {
    created_answer.value = await player.offer(offer.value)
}

take_answer_button.onclick = async function() {
    await player.answer(answer.value).then(() => {
        document.getElementById("rtc-window").style.visibility = "hidden"
    })
}
