module.exports = {
    lander: {
        fuel: 600,
        altitude: 1000,
    },
    params: {
        base: 9,
    },
    nextProblem: function() {
        return this.nextAddProblem()
    },
}
