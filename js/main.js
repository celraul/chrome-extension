const selectors = {
    scriptCodeShowPhrases: `(function() {
        var selector = document.getElementsByClassName("caption-visual-line");
        if(selector){
            var array = [];
            for (var i = 0; i < selector.length; i++) {
                var children = selector[i].children;
    
                if(children){
                    for (var j = 0; j < children.length; j++) {
                        array.push(children[j].innerHTML);
                    }
                }
            }

            return array;
        }

       return null;
    })();`,
    seletorListPhrases: $('#list-phrases')
};

function addPhrasesOnList(phrases, addStorage) {
    if (phrases) {
        for (var i = 0; i < phrases.length; i++) {
            if (phrases[i]) {
                selectors.seletorListPhrases.append("<l1 class='item-phrase'>" + phrases[i] + "</li>");

                if (addStorage)
                    storage.savePhrasesStorage(phrases[i]);
            }
        }
    }
}

const helper = {
    addPhrasesOnList: addPhrasesOnList
}

const storage = {
    clearPhrasesStorage: clearPhrasesStorage,
    savePhrasesStorage: savePhrasesStorage,
    saveConfig: saveConfig,
};

function clearPhrasesStorage() {
    chrome.storage.sync.set({ youPhrases: [] }, function () { });
}

function savePhrasesStorage(phrase) {
    chrome.storage.sync.get('youPhrases', function (data) {

        if (data.phrases) {
            data.phrases.push(phrase);
            chrome.storage.sync.set({ youPhrases: data.phrases }, function () { });
        } else {
            var phrases = [];
            phrases.push(phrase);
            chrome.storage.sync.set({ youPhrases: phrases }, function () { });
        }
    });
}

function saveConfig() {
    const config = { capturaAutomatica: true };
    chrome.storage.sync.set({ configPlugin: config }, function () { });
}

function configuracoesStorage() {
    chrome.storage.sync.get('configPlugin', function (data) {
        return data;
    });
}
