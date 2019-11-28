function nextAddProblem() {
    let base = lib.math.rndi(this.params.base-1) + 1
    let next = lib.math.rndi(this.params.base-1) + 1

    this.problem = '' + base + ' + ' + next
    this.answer = base + next
}

function nextAddSubProblem() {
    let type = lib.math.rndi(2)
    let base = lib.math.rndi(this.params.base-1) + 1
    let next = lib.math.rndi(this.params.next-1) + 1

    switch(type) {
    case 0:
        this.problem = '' + base + ' + ' + next
        this.answer = base + next
        break;
    case 1:
        this.problem = '' + (base+next) + ' - ' + next
        this.answer = base
        break;
    }
}
