module.exports = function(speed) {
    let accuracy = 2
    if (speed > env.tuning.redSpeed) accuracy = 0
    else if (speed > env.tuning.yellowSpeed) accuracy = 1

    lab.panel.land(accuracy, speed)
}
