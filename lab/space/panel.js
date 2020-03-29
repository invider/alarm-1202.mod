const panel = {
    Z: 20,

    s: 2,
    time: 0,
    playTime: 0,
    buffer: 0,
    problem: '',
    answer: -1,
    landed: false,
    landingSpeed: 0,
    blink: 0,
    targetLevel: 1,

    init: function() {
        this.adjust()
    },

    adjust: function() {
        this.s = Math.round(ctx.width/50) / 10

        this.fontSize = Math.round(10*this.s)
        this.font = this.fontSize + 'px ' + env.style.font
        this.font2 = this.fontSize*3 + 'px ' + env.style.titleFont
        this.font3 = this.fontSize*1.2 + 'px ' + env.style.font
        this.font4 = this.fontSize*1 + 'px ' + env.style.font
        this.font5 = this.fontSize*1.3 + 'px ' + env.style.font
    },

    reset: function(digit) {
        this.time = 0
        this.buffer = 0
        this.landed = false
        if (lab.space.level) lab.space.level.nextProblem()
    },

    /*
    nextProblem: function() {
        this.buffer = 0
        // generate simple add problem for now
        let type = lib.math.rndi(2)
        let base = lib.math.rndi(5) + 1
        let next = lib.math.rndi(6) + 1

        if (type === 0) {
            this.problem = '' + base + ' + ' + next
            this.answer = base + next
        } else {
            this.problem = '' + (base+next) + ' - ' + next
            this.answer = base
        }
    },
    */

    input: function(digit) {
        if (this.landed) return

        if (digit < 0) {
            this.buffer = floor(this.buffer/10)
            sfx(res.sfx.select, 0.7)

        } else {
            this.buffer = this.buffer * 10 + digit
            if (this.buffer > 1000) {
                this.buffer = digit
            }
            sfx(res.sfx.type, 0.7)
        }
        this.blink = env.tuning.blink
    },

    enter: function() {
        if (this.landed) {

            const level = this.targetLevel

            lab.transition.transit({
                fadein: 1,
                keep: 7,
                fadeout: 2,

                text: [
                    {
                        at: 1,
                        fadein: 1,
                        keep: 1,
                        fadeout: 1,

                        placement: 1,
                        content: '#ffffff',
                        font: '28px moon',
                        msg: lib.math.rnde(env.msg.titles),
                    },
                    {
                        at: 4.5,
                        fadein: 1,
                        keep: 1,
                        fadeout: 1,

                        content: '#ffffff',
                        font: '38px moon',
                        msg: env.msg.levelMessage + ' ' + level,
                    },
                ],

                onKeep: function() {
                    lab.space.paused = true
                    trap('level', level)
                },
                onFadeout: function() {
                    trap('levelRun')
                },
            })
            sfx(res.sfx.powerup, 0.7)

        } else {
            if (this.buffer === lab.space.level.answer) {
                // got the right answer! Perform the burn
                lab.space.lander.burn(env.tuning.burn)
            } else {
                lib.sfx(res.sfx.wrong_choice, 0.7)
            }
            this.buffer = 0
            lab.space.level.nextProblem()
        }
    },

    left: function() {
        if (this.landed) {
            this.targetLevel = warp(this.targetLevel - 1,
                1, _.lvl.level.length)
            sfx(res.sfx.select, 0.7)
        }
    },

    right: function() {
        if (this.landed) {
            this.targetLevel = warp(this.targetLevel + 1,
                1, _.lvl.level.length)
            sfx(res.sfx.select, 0.7)
        }
    },

    land: function(accuracy, speed) {
        this.landed = true
        this.accuracy = accuracy
        this.landingSpeed = speed
        if (this.accuracy > 1) this.right()
    },

    altColor: function(alt) {
        let color = '#20FF00'
        if (alt <= env.tuning.redAlt) color = '#FF4000'
        else if (alt <= env.tuning.yellowAlt) color = '#FFFF20'
        return color
    },

    speedColor: function(speed) {
        let color = '#20FF00'
        if (speed >= env.tuning.redSpeed) color = '#FF4000'
        else if (speed >= env.tuning.yellowSpeed) color = '#FFFF20'
        return color
    },

    evo: function(dt) {
        this.playTime += dt
        lab.space.level.time += dt
        if (!this.landed) this.time += dt

        this.blink -= dt
        if (this.blink < -env.tuning.blink) {
            this.blink = env.tuning.blink
        }
    },

    draw: function() {
        let time = Math.floor(this.time)
        let alt = Math.floor(lab.space.lander.altitude)
        let speed = Math.floor(lab.space.lander.speed)
        let fuel = Math.floor(lab.space.lander.fuel)

        blocky()

        const s = this.s
        const ps = s*1.5
        image(res.panel3,
            20*ps, ctx.height - res.panel3.height*ps, res.panel3.width*ps, res.panel3.height*ps)

        image(res.panel2,
            ctx.width - res.panel2.width*ps - 20*ps, ctx.height - res.panel2.height*ps,
            res.panel2.width*ps, res.panel2.height*ps)

        const mw = 100*s

        const xanchor1 = 0
        const yanchor1 = ctx.height - mw
        image(res.monitor1, xanchor1, yanchor1, mw, mw)

        const xanchor2 = ctx.width-mw
        const yanchor2 = ctx.height-mw
        image(res.monitor2, xanchor2, yanchor2, mw, mw)

        const mw3 = rx(.3)
        const mh3 = res.monitor101.height * (mw3/res.monitor101.width)
        const xanchor3 = ctx.width/2 - mw3/2
        const yanchor3 = ctx.height - mh3
        image(res.monitor101, xanchor3, yanchor3, mw3, mh3)

        // alt and speed
        ctx.textAlign = "left"
        ctx.textBaseline = "top"
        ctx.font = this.font

        let xbase = xanchor1 + 20*s
        let ybase = yanchor1 + 17*s
        let lf = 3

        ctx.fillStyle = this.altColor(alt)
        ctx.fillText(env.msg.alt + ': ' + alt + env.msg.altUnit, xbase, ybase)

        ybase += this.fontSize + lf
        ctx.fillStyle = this.speedColor(speed)
        ctx.fillText(env.msg.speed + ': ' + speed + env.msg.speedUnit, xbase, ybase)

        xbase = xanchor2 + 20*s
        ybase = yanchor2 + 17*s
        ctx.fillStyle = '#40FF20'

        ctx.fillText(env.msg.level + ': ' + lab.space.level.id, xbase, ybase)

        ybase += this.fontSize + lf
        ctx.fillText(env.msg.time + ': ' + time, xbase, ybase)

        ybase += this.fontSize + lf
        ctx.fillText(env.msg.fuel + ': ' + fuel + env.msg.fuelUnit, xbase, ybase)

        if (this.landed) {
            // show landing status message
            let msg = env.msg.successfulLanding
            if (this.accuracy === 0) msg = env.msg.crashLanding
            else if (this.accuracy === 1) msg = env.msg.harshLanding

            alignCenter()
            baseMiddle()
            font(this.font2)
            fill(this.speedColor(this.landingSpeed))
            text(msg, ctx.width/2, ctx.height * 0.32)

            // computer
            alignCenter()
            baseMiddle()
            fill('#40FF20')

            font(this.font4)
            text(env.msg.pressSpace,
                xanchor3 + mw3*.5,
                yanchor3 + mh3*0.35)

            font(this.font5)
            text(`${env.msg.level} ${this.targetLevel}`,
                xanchor3 + mw3*.5,
                yanchor3 + mh3*0.6)

            triangle(
                xanchor3 + mw3*.22, yanchor3 + mh3*.59,
                xanchor3 + mw3*.26, yanchor3 + mh3*.51,
                xanchor3 + mw3*.26, yanchor3 + mh3*.67
            )

            triangle(
                xanchor3 + mw3*.80, yanchor3 + mh3*.59,
                xanchor3 + mw3*.76, yanchor3 + mh3*.51,
                xanchor3 + mw3*.76, yanchor3 + mh3*.67
            )

        } else {

            // computer
            font(this.font3)
            alignLeft()
            baseMiddle()
            fill('#40FF20')

            let input = '?'
            if (this.blink < 0) input = ''

            if (this.buffer !== 0) {
                input = '' + this.buffer
                if (this.blink > 0 && input.length < 3) input += '_'
            }
            if (lab.space.level) {
                text(lab.space.level.problem + ' = ' + input,
                    xanchor3 + mw3*0.15,
                    yanchor3 + mh3*0.5)
            }

        }

        if ($.paused) {
            alignCenter()
            baseMiddle()
            font(this.font2)
            fill(env.style.pausedColor)
            text(env.msg.paused, ctx.width/2, ctx.height * 0.5)
        }
    }
}
