module.exports = {
    lander: {
        fuel: 600,
        altitude: 1200,
    },
    params: {
        base: 5,
        next: 6, 
    },
    nextProblem: function() {
        return this.nextMulProblem()
    },
}
