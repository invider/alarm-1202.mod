const ID = 'default'
const KEY = 'igYI36C1C3E'
const TARGET = 'http://invasionwave.com:9001'
const MAX_FAILURES = 5

let failed = 0
function telcoError() {
    failed ++
    if (failed >= MAX_FAILURES) {
        env.telcoDisableReporting = true
        log('telco reporting is disabled due to the network errors')
    }
}

function telco(pkg) {
    if (env.telcoDisableReporting) return
    if (!env.telcoSession) {
        trap('telcoSession')
        if (!env.telcoSession) throw 'telco telemetry session is not created'
    }
    const x = env.telcoSession

    if (!pkg.y) throw 'telemetry package type is not specified!'
    const y = pkg.y

    let z = ''
    if (pkg.z) {
        if (isArray(pkg.z)) {
            z = pkg.z.join(',')
        } else {
            z = pkg.z
        }
    }
    const query = `x=${x}&y=${y}&z=${z}`

    const id = env.config.telcoId || env.telcoId || ID
    const key = env.config.telcoKey || env.telcoKey || KEY
    const target = env.config.telcoTarget || env.telcoTarget || TARGET

    const tagImage = new Image()
    tagImage.src = `${target}/${key}/${id}?${query}`
    tagImage.onerror = telcoError
    if (env.config.debug) log(`${target}/${key}/${id} => ${query}`)
}
