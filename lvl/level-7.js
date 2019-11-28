module.exports = {
    lander: {
        fuel: 400,
        altitude: 1200,
    },
    params: {
        base: 10,
        next: 9
    },
    nextProblem: function() {
        return this.nextAddSubProblem()
    },
}
