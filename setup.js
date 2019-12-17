function appendGoogleAnalytics() {
	const gtag = document.createElement('script')
	gtag.async = true
	gtag.src = src="https://www.googletagmanager.com/gtag/js?id=UA-111208379-7"

	document.head.appendChild(gtag)
}

function setupGoogleAnalytics() {
	appendGoogleAnalytics()

	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'UA-111208379-7');
}

function setup() {
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
                font: '38px moon',
                msg: env.msg.title1,
            },
            {
                at: 3.5,
                fadein: 1,
                keep: 1,
                fadeout: 1,

                content: '#ffffff',
                font: '38px moon',
                msg: env.msg.title2,
            },
        ],

        onFadeout: function() {
            trap('levelRun')
        },
    })

	setupGoogleAnalytics()
}
