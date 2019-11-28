module.exports = {
    lander: {
        fuel: 400,
        altitude: 1000,
    },
    params: {
        base: 5,
        next: 4 
    },
    nextProblem: function() {
        return this.nextAddSubProblem()
    },
}
