const FOR_YOU_URL = 'https://spaces.technik.fhnw.ch/beitr%C3%A4ge/f%C3%BCr-dich';
const HOME_PAGE = 'https://spaces.technik.fhnw.ch/';

const homeFeedBox = document.getElementsByClassName('col-span-8').item(0).children.item(0)
const homeFeed = homeFeedBox.children.item(2)
const homeFeedTitle = homeFeedBox.children.item(0).children.item(0)
const homeFeedButton = homeFeedBox.children.item(0).children.item(1)
const homeFeedFooterButton = homeFeedBox.children.item(3)

homeFeed.innerHTML = ''
homeFeedTitle.innerHTML = 'Letzte Beiträge in deinen Spaces'
homeFeedButton.innerHTML = ''
homeFeedFooterButton.innerHTML = ''

fetch(FOR_YOU_URL).then(res => {
    res.text().then(text => {
        ul_open_index = text.indexOf('<ul>');
        ul_close_index = text.indexOf('</ul>');
        forYouFeed = text.slice(ul_open_index, ul_close_index - ul_open_index)
        homeFeed.innerHTML = forYouFeed;

        homeFeed.style.maxHeight = '500px';
        homeFeed.style.overflowY = 'scroll';
        homeFeed.style.overflowX = 'hidden';
    });
});