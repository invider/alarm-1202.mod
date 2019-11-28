module.exports = {
    lander: {
        fuel: 600,
        altitude: 800,
    },
    params: {
        base: 7,
    },
    nextProblem: function() {
        return this.nextAddProblem()
    },

}
