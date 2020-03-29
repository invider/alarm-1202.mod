'use strict'

function level(n) {
    if (!env.tries) {
        env.tries = 1
    } else {
        env.tries ++
    }

    if (lab.space.level && lab.space.level.id === n) {
        // same level over again
        env.levelTries ++
    } else {
        env.levelTries = 1
    }

    let level = _.lvl.level[n]
    if (!level) {
        level = _.lvl.level[1]
        level.id = 1
    } else {
        level.id = n
    }
    level.time = 0
    augment(level, _.lvl.level[0])
    log('level: ' + level.id)

    if (lab.space.level) {
        lab.space.detach(lab.space.level)
    }
    lab.space.attach(level, 'level')

    lab.space.lander.reset(level.lander)
    lab.space.panel.reset()
    lab.space.stars.spawn()

    trap('tag', {
        type: 'level-started',
        label: 'level-' + n,
    })

    trap('telco', {
        type: 2,
        payload: [
            n,
            env.levelTries + ':' + env.tries,
            round(lab.space.panel.playTime),
            lib.util.sessionTime(),
            `${ctx.width}x${ctx.height}`,
        ]
    })
}
