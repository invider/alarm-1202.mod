'use strict'

module.exports = function(n) {
    let level = _.lvl.level[n]
    if (!level) {
        level = _.lvl.level[1]
        level.id = 1
    } else {
        level.id = n
    }
    augment(level, _.lvl.level[0])
    log('level: ' + level.id)

    lab.attach(level, 'level')

    lab.lander.reset(level.lander)
    lab.panel.reset()
    lab.space.spawn()

    setTimeout(() => {
        lib.sfx(res.sfx.chat_go, 0.6)
    }, 1000)

    setTimeout(() => {
        lib.sfx(res.sfx.chat_1202, 0.6)
    }, 5000)
}
