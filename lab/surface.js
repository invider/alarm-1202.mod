'use strict'

const Z = 2

let VISIBILITY_ALT= 100
let ZERO_LEVEL = 0.9

function draw() {
    const alt = lab.lander.altitude

    if (alt < VISIBILITY_ALT) {
        let surfaceHeight = ZERO_LEVEL * ctx.height
        let visiblePart = surfaceHeight * (1 - alt/VISIBILITY_ALT)

        image(res.moon2,
            0, ctx.height - visiblePart,
            ctx.width, surfaceHeight)
    }
}
