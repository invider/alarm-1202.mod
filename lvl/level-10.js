module.exports = {
    lander: {
        fuel: 400,
        altitude: 1600,
    },
    params: {
        base: 25,
        next: 24
    },
    nextProblem: function() {
        return this.nextAddSubProblem()
    },
}
