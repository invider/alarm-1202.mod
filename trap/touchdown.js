module.exports = function(speed) {
    let accuracy = 2
    if (speed > env.tuning.redSpeed) accuracy = 0
    else if (speed > env.tuning.yellowSpeed) accuracy = 1

    lab.space.panel.land(accuracy, speed)

    let outcome
    switch(accuracy) {
        case 0: outcome = 'crash'; break;
        case 1: outcome = 'hard'; break;
        case 2: outcome = 'land'; break;
    }

    trap('telco', {
        y: env.telco.LEVEL_COMPLETE,
        z: [
            lab.space.level.id,
            outcome,
            round(speed),
            round(lab.space.level.time),
            round(lab.space.panel.playTime),
            lib.util.sessionTime(),
            `${ctx.width}x${ctx.height}`,
        ]
    })
}
