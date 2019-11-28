module.exports = {
    lander: {
        fuel: 400,
        altitude: 1000,
    },
    params: {
        base: 6,
        next: 5
    },
    nextProblem: function() {
        return this.nextAddSubProblem()
    },
}
