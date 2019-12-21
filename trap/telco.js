function telco(st) {
    if (!env.session) throw 'telemetry session is not created'
    if (!st.type) throw 'telemetry package type is not specified!'

    const query =
        `y=${st.type}&`
        + `x=${env.session}&z=`
        + st.payload.join(',')

    //log('Q: ' + query)

    const tagImage = new Image()
    tagImage.src = env.tuning.telco + '?' + query
}
