
function getResolution() {
    const screenWidth = screen.width
    const screenHeight = screen.height
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    return `${screenWidth}x${screenHeight}:${windowWidth}x${windowHeight}`
}

function sessionTime() {
    return round( (Date.now() - env.sessionStart)/1000 )
}
