function tag(st) {
    if (ga) {
        ga('send', 'event', 'a1202-' + st.type, st.label)
        if (st.type === 'level-started') {
            ga('send', 'pageview', `${location.pathname}/${st.label}`)
        }
    }
    if (gtag) {
        gtag('event', 'level-start', '#' + st.label)
    }
}
