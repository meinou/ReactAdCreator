
if (document.readyState === 'complete') {
    findAds();
  } else {
    window.addEventListener('load', findAds, false);
  }

function findAds() {
    var ads = document.querySelectorAll('[data-ad]');
    for(var i = 0; i < ads.length; i++) {
        httpGetAsync('http://localhost:8084/' + ads[i].dataset.ad + '.json', showAd);
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
    if (element.dataset.rendered === 1) {
        return;
    }

    setStyles(element);

    var adRootDiv = document.createElement('div');
    element.appendChild(adRootDiv)
    adRootDiv.className = 'ad-root';

    // var wrapper = document.createElement('div');
    // wrapper.className = 'ad-wrapper';
    // adRootDiv.appendChild(wrapper);

    var asset = getImageOrVideo(response);
    adRootDiv.appendChild(asset);

    if (response.cta) {
        adRootDiv.appendChild(getButton(response));
    }

    element.dataset.rendered = 1;
}

function getButton(response) {
    var btn = document.createElement('a');
    btn.href = response.clickUrl;
    btn.innerText = response.cta;
    return btn;
}

function getImageOrVideo(response) {
    var element;
    if (response.imageUrl && (response.imageUrl.endsWith('.mp4') 
        || response.imageUrl.endsWith('.webm') 
        || response.imageUrl.endsWith('.flv'))) {
        element = document.createElement('video');
    } else {
        element = document.createElement('img');
    }
    element.src = response.imageUrl;
    return element;
}

function setStyles(element) {
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = '.ad-root { height: 300px; width: 100%; text-align: center;display: flex;align-items: center; justify-content: center } '
        + ' img { border: 2px solid dodgerblue; border-radius: 5px; } '
        // + ' .ad-root.ad-wrapper { width: 100px; height: 100px } '
        + ' .ad-root a {  border-radius: 2px; border: 2px solid dodgerblue; height: 20px; width: 80%;  background-color: white; padding: 15px; color: dodgerblue; cursor: pointer; text-decoration: none }';
    style.appendChild(document.createTextNode(css));
    element.appendChild(style);
    return style;
}