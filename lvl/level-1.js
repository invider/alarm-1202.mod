module.exports = {
    lander: {
        fuel: 600,
        altitude: 600,
    },
    params: {
        base: 5,
    },
    nextProblem: function() {
        return this.nextAddProblem()
    },
}
