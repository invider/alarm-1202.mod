function setup() {
    lab.space.spawn('lander')
    trap('level', 1)

    lab.space.paused = true

    lab.transition.transit({
        fadein: 0,
        keep: 4,
        fadeout: 2,

        text: [
            {
                at: 1,
                fadein: 1,
                keep: 1,
                fadeout: 1,

                content: '#ffffff',
                font: '32px moon',
                msg: env.msg.title1,
            },
        ],

        onFadeout: function() {
            trap('levelRun')
        },
    })
}
