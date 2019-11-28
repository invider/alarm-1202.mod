module.exports = {
    lander: {
        fuel: 400,
        altitude: 1000,
    },
    params: {
        base: 8,
        next: 7
    },
    nextProblem: function() {
        return this.nextAddSubProblem()
    },
}
