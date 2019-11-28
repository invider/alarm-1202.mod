let STAR_FQ = 2

// star background
return {
    Z: 1,
    stars: [],

    newStar: function() {
        let star = {
            a: true,
            c: lib.math.rndi(3),
            x: lib.math.rndi(ctx.width),
            y: ctx.height + 20,
            s: 10 + lib.math.rndi(20),
            m: 3 + lib.math.rndi(15),
        }

        for (let i = 0; i < this.stars.length; i++) {
            if (!this.stars[i].a) {
                this.stars[i] = star
                return
            }
        }

        this.stars.push(star)
    },

    spawn: function() {
        for(let i = 0; i < 60*60; i++) {
            this.evo(0.015, 10)
        }
    },

    evo: function(dt, speed) {

        // determine stars speed
        if (!speed) {
            speed = 0
            if (lab.lander) speed = lab.lander.speed
        }

        // move stars
        this.stars.forEach( star => {
            star.y -= star.s * dt * (speed/5)
            if (star.y < 0) star.a = false
        })

        if (speed > 0) {
            if (lib.math.rndf() < STAR_FQ * dt) this.newStar()
        }
    },

    draw: function() {
        // clear the screen
        background("#100630")

        // draw stars
        this.stars.forEach( star => {
            let img = res['star-blue']
            switch(star.c) {
            case 0: img = res['star-blue']; break;
            case 1: img = res['star-yellow']; break;
            case 2: img = res['star-red']; break;
            }
            image(img, star.x, star.y, star.m, star.m)
        })
    },
};

