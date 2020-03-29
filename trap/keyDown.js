function keyDown(e) {
    let digit
    if (e.which >= 96) {
        digit = e.which - 96
    } else {
        digit = e.which - 48
    }
    if (digit >= 0 && digit < 10) {
        lab.space.panel.input(digit)
    }
}
