const services = {
    'ascii2d': {
        url: 'https://ascii2d.net/search/url/'
    },
    'Google': {
        url: 'https://www.google.com/searchbyimage?image_url='
    },
    'Yandex': {
        url: 'https://yandex.com/images/search?rpt=imageview&url='
    },
    'trace.moe': {
        url: 'https://trace.moe/?url='
    },
    'SauceNAO': {
        url: 'https://saucenao.com/search.php?db=999&url='
    }
};

function setUpContextMenus() {
    chrome.contextMenus.create({
        title: 'Image QSearch',
        id: 'parent',
        contexts: ['image']
    });

    for (let id in services) {
        const obj = {
            id,
            parentId: 'parent',
            title: id,
            contexts: ['image']
        }

        chrome.contextMenus.create(obj);
    }
};

chrome.runtime.onInstalled.addListener(() => {
    setUpContextMenus();
});

chrome.contextMenus.onClicked.addListener(e => {
    switch (e.menuItemId) {
        case 'ascii2d':
        case 'Google':
        case 'Yandex':
        case 'trace.moe':
        case 'SauceNAO':
            chrome.tabs.create({
                url: `${services[e.menuItemId].url}${e.srcUrl}`
            });
            break;
        default:
            throw new Error(`Invalid menuItemId: ${e.menuItemId}`);
    }
});