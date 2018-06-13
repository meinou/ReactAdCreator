
if (document.readyState === 'complete') {
    findAds();
  } else {
    window.addEventListener('load', findAds, false);
  }

function findAds() {
    var ads = document.querySelectorAll('[data-ad]');
    for(var i = 0; i < ads.length; i++) {
        httpGetAsync('http://localhost:8080/creator/ads/' + ads[i].dataset.ad, showAd);
    }
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function showAd(responseStr) {
    var response = JSON.parse(responseStr);
    var element = document.querySelector('[data-ad="' + response.aid + '"]');
    if (element.dataset.rendered === '1') {
        return;
    }

    setStyles(element, response);

    var adRootDiv = document.createElement('div');
    element.appendChild(adRootDiv)
    adRootDiv.className = 'ad-root';

    var assetDiv = getImageOrVideoDiv(response);
    adRootDiv.appendChild(assetDiv);

    if (response.cta) {
        assetDiv.appendChild(getButton(response));
    }

    element.dataset.rendered = 1;
}

function getButton(response) {
    var btn = document.createElement('a');
    btn.href = response.clickUrl;
    btn.innerText = response.cta;
    return btn;
}

var fadeEffect = 'ad-fade';
var grayscaleOnHover = 'gray-on-hover';

function getImageOrVideoDiv(response) {
    var elementWrapper = document.createElement('div');
    var adText = document.createElement('span');
    // adText.className = 'ad-text';
    adText.innerText = 'ADVERTISEMENT';
    elementWrapper.appendChild(adText);
    elementWrapper.className = 'ad-wrp';

    var element = document.createElement('div');

    if (response.imageUrl && (response.imageUrl.endsWith('.mp4') 
        || response.imageUrl.endsWith('.webm') 
        || response.imageUrl.endsWith('.flv'))) {
        var video = document.createElement('video');
        video.src = response.imageUrl;
        element.appendChild(video);
    } else {
        var img = document.createElement('img');
        img.src = response.imageUrl;
        element.style.background = 'url(' + response.imageUrl + ') no-repeat center';
        element.style.backgroundSize = 'contain';
        element.className = 'ad-image ';
        element.appendChild(img);

        // fade effects
        if (response.effects && (response.effects.filter(e => e.name === "colorOnHover")).length) {
            element.className += grayscaleOnHover;
        }
        if (response.effects && (response.effects.filter(e => e.name === "grayscaleOnRest")).length) {
            element.className += fadeEffect;
            var turnGray = debounce(function () {
                if (element.className && element.className.indexOf(fadeEffect) < 0) {
                    element.className = element.className + ' ' + fadeEffect;
                }   
            }, 1000, false);

            var handleScroll = function (e) {
                if (element.className && element.className.indexOf(fadeEffect) >= 0) {
                    element.className = element.className.replace(fadeEffect, '');
                }
                // check if there's fade effect in response
                turnGray();
            }
            var localRoot = document.querySelector('.ad-screen-wrap');
            if (localRoot) {
                localRoot.addEventListener('scroll', handleScroll);
            }
            window.addEventListener('scroll', handleScroll);
        }
        
    }
    elementWrapper.appendChild(element);
    return elementWrapper;
}

function setStyles(element, response) {
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = '.ad-root { height: 280px; width: 100%; text-align: center;display: flex;align-items: center; justify-content: center } '
        + ' .ad-root .ad-wrp { text-align: left; position: relative; } '
        + ' .ad-root span { color: gray; font-size: 12px } '
        + ' .ad-root .ad-image { position: relative; height: 240px; transition: all 2s ease; filter: grayscale(0%);} '
        + ' .ad-root .ad-image.ad-fade { filter: grayscale(100%); transition: all 2s ease; } '
        + ' .ad-root .ad-image .ad-text { color: gray; display: block;} '
        + ' .ad-root img { visibility: hidden; height: 240px; } '
        + ' .ad-root a { display: inline-table; margin-bottom: 15px; transform: translateX(-50%); position: absolute; bottom: 0px; left: 50%; padding: 15px; background-color: white; border: 2px solid dodgerblue; border-radius: 4px; cursor: pointer; text-decoration: none; } '
        + ' .ad-root a:visited { color: dodgerblue; } '
        ;
    if (response.effects && (response.effects.filter(e => e.name === "colorOnHover")).length) {
        css += ' .ad-root .ad-image.' + grayscaleOnHover + ' { transition: all 2s ease; filter: grayscale(100%); }  ';
        css += ' .ad-root .ad-image.' + grayscaleOnHover + ':hover { filter: grayscale(0%); }  ';
    }
    style.appendChild(document.createTextNode(css));
    element.appendChild(style);
    return style;
}

function grayscaleEffect() {

}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};