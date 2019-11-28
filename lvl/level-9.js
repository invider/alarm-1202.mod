module.exports = {
    lander: {
        fuel: 400,
        altitude: 1500,
    },
    params: {
        base: 20,
        next: 15
    },
    nextProblem: function() {
        return this.nextAddSubProblem()
    },
}
