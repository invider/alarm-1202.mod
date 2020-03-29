var Explosion = function(x, y, lifespan, force,
        size, vsize, speed, vspeed,
        startAngle, spread, minLifespan, vLifespan) {
    this.lifespan = lifespan
    this.x = x
    this.y = y
    this.radius = 0
    this.img = res.particle
    this.color = "#FFFFFF"
    this.size = size
    this.vsize = vsize
    this.speed = speed
    this.vspeed = vspeed
    this.startAngle = startAngle
    this.spread = spread
    this.minLifespan = minLifespan
    this.vLifespan = vLifespan

    this.alive = true
    this.potential = 0
    this.force = force
    this.frequency = 1/this.force
    this.particles = []

    this.rnd = function(n) {
        return Math.random() * n
    }

    this.Particle = function(img, color, x, y, speed, angle, lifespan) {
        this.alive = true
        this.img = img
        this.color = color
        this.r = 1
        this.gr = -this.r
        this.x = x
        this.y = y
        this.speed = speed
        this.angle = angle
        this.dx = Math.cos(angle) * speed
        this.dy = Math.sin(angle) * speed
        this.lifespan = lifespan
        this.maxspan = lifespan
        this.fadespan = this.lifespan*2

        this.mutate = function(delta) {
            this.lifespan -= delta
            if (this.lifespan < 0) {
                this.alive = false
            }

            // movement
            this.x += this.dx * delta
            this.y += this.dy * delta
        }

        this.draw = function() {
            if (this.img) {
                alpha(0.5)
                image(this.img, this.x-this.r/2, this.y-this.r/2, this.r, this.r);
            } else {
                if (this.lifespan < this.fadespan) {
                    alpha(this.lifespan/this.fadespan)
                } else {
                    alpha(1)
                }
                fill(this.color)
                rect(this.x-this.r, this.y-this.r,
                    this.r2, this.r2)
            }
        }
    }

    this.createParticle = function() {
        const r = this.rnd(this.radius)
        const dir = this.rnd(Math.PI*2)
        const dx = Math.cos(dir) * r
        const dy = Math.sin(dir) * r

        var p = new this.Particle(
                this.img,
                this.color,
                this.x + dx,
                this.y + dy,
                this.speed + this.rnd(this.vspeed),                // speed
                this.startAngle + this.rnd(this.spread),
                this.minLifespan + this.rnd(this.vLifespan)
                )
        p.r = this.size+this.rnd(this.vsize)
        p.r2 = p.r*2
        return p
    }

    this.spawn = function() {
        var p = this.createParticle()
        // find a slot
        var placed = false
        for (var i = 0; i < this.particles.length; i++) {
           if (!this.particles[i].alive) {
               this.particles[i] = p
               placed = true
               break;
           }
        }
        if (!placed) this.particles.push(p)
    }
}

Explosion.prototype.init = function(parent, scene) {
}

Explosion.prototype.evo = function(delta) {
    if (this.lifespan > 0) {
        this.lifespan -= delta
        if (this.lifespan < 0) this.lifespan = 0
    }

    // emitting
    this.potential += delta
    while (this.lifespan !== 0 && this.potential >= this.frequency) {
        this.potential -= this.frequency
        this.spawn()
    }

    // mutating particles
    var pn = 0
    this.particles.map( function(p) {
        if (p.alive) {
            pn++
            p.mutate(delta)
        }
    })

    if (pn === 0 && this.lifespan === 0) {
        this.alive = false
        this.dead = true
        this.kill()
    }
}

Explosion.prototype.draw = function() {
    save()
    var i = 0
    this.particles.map( function(p) {
        i++
        if (p.alive) p.draw()
    })
    restore()
}

Explosion.prototype.kill = function() {
    if (this.__) this.__.detach(this)
}

module.exports = Explosion
