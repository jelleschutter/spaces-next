function replaceJS(url, str) {
  if (url == 'https://spaces.technik.fhnw.ch/js/app.js') {
    str = str.replace([
      'function blurFixedJumbotron(scrollPos) {',
      '  if (fixedJumbotron != null) {',
      `    fixedJumbotron.style.filter = 'blur(' + Math.min(scrollPos / 2.5, 40) + 'px)';`,
      `    fixedJumbotron.style.opacity = Math.max(1 - scrollPos / 150, 0.333); //jumbotron.style.transform = 'scale(' + (1 - (scrollPos / 1000)) + ')';`,
      '  }',
      '}'
    ].join('\n'), 'function blurFixedJumbotron(scrollPos) {}');
  }
  return str;
}

function listener(details) {
  if (details.url == 'https://spaces.technik.fhnw.ch/js/app.js') {
    if (browser.webRequest.filterResponseData) {
      let filter = browser.webRequest.filterResponseData(details.requestId);
      let decoder = new TextDecoder();
      let encoder = new TextEncoder();

      filter.ondata = event => {
        let str = decoder.decode(event.data, { stream: true });
        str = replaceJS(details.url, str);
        filter.write(encoder.encode(str));
      }

      filter.onstop = () => {
        filter.disconnect();
      }

      return {};
    }

    const request = new XMLHttpRequest();
    request.open(details.method, details.url, false);
    request.send();
    str = replaceJS(details.url, request.responseText);

    return { redirectUrl: 'data:text/javascript,' + encodeURIComponent(str) };
  }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {
    urls: ['https://spaces.technik.fhnw.ch/*'],
    types: ['script']
  },
  ['blocking']
);