const replaceLink = () => {
    var element = document.getElementById("swfMailTo");
    if(element == null) return;
    element.removeAttribute("href");
    element.onclick = ()=>{
        GenerateShortenURL();
        element.innerHTML = "コピー済"
    }
}

const GenerateShortenURL = () => {
    const url = window.location.href;
    const shortUrl = ShortenAmazonUrl(url);
    if(shortUrl == null) return;
    navigator.clipboard.writeText(shortUrl);
}

const ShortenAmazonUrl = (url) => {
    console.log(url);
    const regExp = /^https:\/\/www\.amazon.co.jp\/.*\/?(?:dp|gp\/product)\/(\w+)(?:\?.+)?(\/ref=.+)?/;
    const matches = url.match(regExp);
    if(!regExp.test(url) || matches.length < 1){
        console.log("not supported format url")
        return;
    }
    const productId = matches[1];
    const amazonUrl = `https://amazon.jp/dp/${productId}/`;

    console.log(`[Shorten URL!] : ${amazonUrl} from ${url}`)

    return amazonUrl;
}

replaceLink();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
		hogehoge();
	}
});