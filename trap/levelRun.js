function levelRun() {
    lab.space.paused = false

    setTimeout(() => {
        lab.space.lander.initBurn()
    }, 2000)

    setTimeout(() => {
        lib.sfx(res.sfx.chat_go, 0.6)
    }, 3000)

    setTimeout(() => {
        lib.sfx(res.sfx.chat_1202, 0.6)
    }, 8000)
}
