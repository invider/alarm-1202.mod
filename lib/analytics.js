// include ga function
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

function appendGoogleAnalyticsTag() {
	const gaScript = document.createElement('script')
	gaScript.async = true
	gaScript.src = "https://www.googletagmanager.com/gtag/js?id=UA-111208379-7"

	document.head.appendChild(gaScript)
}

function setupGoogleAnalyticsTag() {
	appendGoogleAnalyticsTag()

	window.dataLayer = window.dataLayer || [];
	window.gtag = function gtag(){
        dataLayer.push(arguments)
    }
	gtag('js', new Date());
	gtag('config', 'UA-111208379-7');

}

function setupGoogleAnalytics() {
    ga('create', 'UA-111208379-7', 'auto');
    //ga('send', 'pageview');
}
