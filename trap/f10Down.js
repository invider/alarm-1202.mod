
let shots = 0

function f10Down(e) {
    if (e.repeat) return
    lib.img.screenshot('alarm1202-' + (++shots))
}
