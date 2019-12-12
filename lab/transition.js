const HIDDEN = 0
const FADE_IN = 1
const KEEP = 2
const FADE_OUT = 3
const WAIT = 4

const defaults = {
    fadein: .5,
    keep: 1,
    fadeout: .5,
    background: '#000000',
}

function init() {
    this.state = HIDDEN
}

function transit(st) {
    this.__.detach(this)
    this.__.attach(this)

    this.config = augment({
        transition: this,
    }, defaults)
    this.config = augment(this.config, st)

    this.state = FADE_IN
    this.time = this.config.fadein
    this.fader = this.time
}

function evo(dt) {
    if (this.state === HIDDEN) return

    this.fader -= dt

    switch(this.state) {

    case FADE_IN:
        if (this.fader <= 0) {
            this.state = KEEP
            this.time = this.config.keep
            this.fader = this.time
            if (this.config.onKeep) this.config.onKeep()
        }
        break;

    case KEEP:
        if (this.fader <= 0) {
            this.state = FADE_OUT
            this.time = this.config.fadeout
            this.fader = this.time
            if (this.config.onFadeout) this.config.onFadeout()
        }
        break;

    case FADE_OUT:
        if (this.fader <= 0) {
            this.state = HIDDEN
            if (this.config.onHidden) this.config.onHidden()
        }
        break;
    }

    this.config.text.forEach(t => {
        if (t.state === HIDDEN) return

        t.at -= dt

        switch(t.state) {
        case WAIT:
                if (t.at <= 0) {
                    t.state = FADE_IN
                    t.at = t.fadein
                }
                break;

        case FADE_IN:
                t.alpha = 1 - t.at/t.fadein
                if (t.at <= 0) {
                    t.state = KEEP
                    t.at = t.keep
                    t.alpha = 1
                }
                break;
        case KEEP:
                if (t.at <= 0) {
                    t.state = FADE_OUT
                    t.at = t.fadeout
                }
                break;
        case FADE_OUT:
                t.alpha = t.at/t.fadeout
                if (t.at <= 0) {
                    t.state = HIDDEN
                }
                break;

        default:
                t.alpha = 0
                t.state = WAIT
        }
    })
}

function draw() {
    if (this.state === HIDDEN) return

    save()
    switch (this.state) {
    case FADE_IN:   alpha(1 - this.fader/this.time); break;
    case KEEP:      alpha(1); break;
    case FADE_OUT:  alpha(this.fader/this.time); break;
    }
    background(this.config.background)

    this.config.text.forEach(t => {
        if (!t.state || t.state === WAIT || t.state === HIDDEN) return

        alpha(t.alpha)
        alignCenter()
        baseMiddle()
        font(t.font)
        fill(t.content)
        text(t.msg, rx(.5), ry(.5))
    })

    //text('#' + this.state, rx(.5), ry(.5))
    restore()
}
