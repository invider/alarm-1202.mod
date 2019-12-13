'use strict'

function level(n) {
    let level = _.lvl.level[n]
    if (!level) {
        level = _.lvl.level[1]
        level.id = 1
    } else {
        level.id = n
    }
    augment(level, _.lvl.level[0])
    log('level: ' + level.id)

    lab.space.attach(level, 'level')

    lab.space.lander.reset(level.lander)
    lab.space.panel.reset()
    lab.space.stars.spawn()

}
