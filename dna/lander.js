module.exports = function(init) {
    return {
        Z: 10,
        name: 'lander',
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        s: 4,
        angle: 0,
        speed: 0,
        altitude: 0,
        fuel: 100,
        flames: [],

        reset: function(st) {
            if (lab.space.vent) lab.space.detach(lab.space.vent)
            this.angle = 0
            sys.augment(this, st)
        },

        adjust: function() {
            this.x = ctx.width * 0.5
            this.y = ctx.height * 0.5
        },

        init: function() {
            this.adjust()
            this.img = res['lander-bug']
            this.w = this.img.width * this.s
            this.h = this.img.height * this.s
        },

        initBurn: function() {
            this.jet()
        },

        jet: function() {
            // x, y, lifespan, force,
            //size, vsize, speed, vspeed,
            //startAngle, spread, minLifespan, vLifespan) {
            let fc = this.flames.reduce((a, c) => { if (c.alive) a++ }, 0)
            if (fc === 0) this.flames = []

            const s = this.s
            this.flames.push(new dna.Explosion(
                -7*s, 12*s, // x, y
                1.5, 300,
                2*s, 2*s,
                120, 0,
                Math.PI/2-0.2, 0.4,
                0.6, 0.4
            ))
            this.flames.push(new dna.Explosion(
                7*s, 12*s, // x, y
                1.5, 300,
                2*s, 2*s,
                120, 0,
                Math.PI/2-0.2, 0.4,
                0.6, 0.4
            ))
            lib.sfx(res.sfx.burn2, 0.7)
        },

        vent: function() {
            // x, y, lifespan, force,
            //size, vsize, speed, vspeed,
            //startAngle, spread, minLifespan, vLifespan) {
            const s = this.s
            const d = new dna.Explosion(
                this.x + 4*s, this.y - 5*s, // x, y
                -1, 600,
                0.3 * s, 0.3 * s,
                30, 10,
                Math.PI*1.5-0.3, 0.6,
                2, 0.5,
            )
            d.name = 'vent'
            d.radius = 4*s
            d.img = false
            d.color = '#a0a0d0'

            lab.space.attach(d)
        },

        dust: function() {
            // x, y, lifespan, force,
            //size, vsize, speed, vspeed,
            //startAngle, spread, minLifespan, vLifespan) {
            
            const s = this.s
            const d1 = new dna.Explosion(
                this.x-17*s, this.y + 12*s, // x, y
                0.5, 800,
                s, s,
                40, 40,
                Math.PI, 1,
                0.5, 1.
            )
            d1.radius = 3*s
            d1.img = false
            d1.color = '#808080'

            const d2 = new dna.Explosion(
                this.x+17*s, this.y + 12*s, // x, y
                0.5, 800,
                s, s,
                40, 40,
                Math.PI*2-1, 1,
                0.5, 1,
            )
            d2.radius = 3*s
            d2.img = false
            d2.color = '#808080'

            const d3 = new dna.Explosion(
                this.x, this.y + 15*s, // x, y
                0.5, 800,
                s, s,
                40, 40,
                Math.PI*1.5-0.8, 1.6,
                0.5, 1,
            )
            d3.radius = 3*s
            d3.img = false
            d3.color = '#808080'

            lab.space.attach(d1)
            lab.space.attach(d2)
            lab.space.attach(d3)
        },

        crash: function() {
            // x, y, lifespan, force,
            //size, vsize, speed, vspeed,
            //startAngle, spread, minLifespan, vLifespan) {
            
            const s = this.s
            const d = new dna.Explosion(
                this.x, this.y + 12*s, // x, y
                0.3, 20000,
                s, s,
                10, 200,
                Math.PI*1.5-1.5, 3,
                1, 0.5,
            )
            d.radisu = 15*s
            d.img = false
            d.color = '#808080'

            lab.space.attach(d)
        },

        burn: function(val) {
            if (this.fuel > 0) {
                this.fuel = max(this.fuel - env.tuning.burnFuel, 0)
                this.speed -= val
                if (this.speed < 1) this.speed = 1
                this.jet()
            }
        },

        evo: function(dt) {
            if (this.altitude > 0) {
                this.altitude -= this.speed * dt
                this.speed += env.tuning.gravity * dt
                if (this.altitude <= 0) {
                    // landed!
                    let landingSpeed = this.speed
                    this.speed = 0
                    this.altitude = 0
                    if (landingSpeed > env.tuning.redSpeed) {
                        // crash land
                        this.angle = Math.PI * 0.7
                        this.vent()
                        this.crash()
                        setTimeout(() => {
                            lib.sfx(res.sfx.chat_problem, 0.6)
                        }, 2000)
                        setTimeout(() => {
                            lib.sfx(res.sfx.chat_venting, 0.6)
                        }, 8000)
                        lib.sfx(res.sfx.crash, 1)
                    } else if (landingSpeed > env.tuning.yellowSpeed) {
                        this.angle = -Math.PI/5
                        this.crash()
                        setTimeout(() => {
                            lib.sfx(res.sfx.chat_problem, 0.6)
                        }, 2000)
                        lib.sfx(res.sfx.harsh, 1)
                    } else {
                        this.angle = 0
                        this.dust()
                        lib.sfx(res.sfx.landing, 0.7)
                        setTimeout(() => {
                            lib.sfx(res.sfx.chat_landed, 0.6)
                        }, 2000)
                    }
                    trap('touchdown', landingSpeed)
                }
            }
            this.flames.forEach(f => f.evo(dt))

            this.adjust()
        },

        draw: function() {
            save()
            translate(this.x, this.y)
            rotate(this.angle)
            blocky()
            image(this.img, -this.w/2, -this.h/2, this.w, this.h)

            this.flames.forEach(f => f.draw())
            restore()
        },
    }
}
