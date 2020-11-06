function setupSessionClose() {
    window.onunload = function() {
        
        trap('telco', {
            y: SESSION_END,
            z: [
                lib.util.sessionTime(),
                lib.util.getResolution(),
            ]
        })
    }
}

function setup() {
    augment(env.tuning, env.config)
    env.sessionStart = Date.now()

	lib.analytics.setupGoogleAnalytics()
	lib.analytics.setupGoogleAnalyticsTag()
    trap('session')

    lab.space.spawn('lander')
    trap('level', 1)

    lab.space.paused = true

    lab.transition.transit({
        fadein: 0,
        keep: 7,
        fadeout: 2,

        text: [
            {
                at: 0,
                fadein: 1,
                keep: 1,
                fadeout: 1,

                content: '#ffffff',
                font: '38px ' + env.style.titleFont,
                msg: env.msg.title1,
            },
            {
                at: 3.5,
                fadein: 1,
                keep: 1,
                fadeout: 1,

                content: '#ffffff',
                font: '38px ' + env.style.titleFont,
                msg: env.msg.title2,
            },
        ],

        onFadeout: function() {
            trap('levelRun')
        },
    })

    setupSessionClose()
    lib.util.hideCursor()
}
