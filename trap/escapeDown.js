function escapeDown(e) {
    // figure out the next level
    let n = lab.space.level.id
    if (!n) n = 0
    n = n + 1
    if (n >= _.lvl.level.length) n = 1

    trap('level', n)
}
