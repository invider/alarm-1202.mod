module.exports = {
    lander: {
        fuel: 400,
        altitude: 1500,
    },
    params: {
        base: 12,
        next: 11
    },
    nextProblem: function() {
        return this.nextAddSubProblem()
    },
}
