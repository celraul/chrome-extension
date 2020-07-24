function clearPhrasesStorage() {
    chrome.storage.sync.set({ youPhrases: [] }, function () { });
}

function savePhrasesStorage(phrase) {
    chrome.storage.sync.get('youPhrases', function (data) {
        if (data.youPhrases) {
            data.youPhrases.push(phrase);
            chrome.storage.sync.set({ youPhrases: data.youPhrases }, function () { });
        } else {
            var phrases = [];
            phrases.push(phrase);
            chrome.storage.sync.set({ youPhrases: phrases }, function () { });
        }
    });
}

function removePhraseStorage(phraseId) {
    chrome.storage.sync.get('youPhrases', function (data) {
        if (data.youPhrases) {
            for (let index = 0; index < data.youPhrases.length; index++) {
                if (data.youPhrases[index].id == phraseId) {
                    data.youPhrases.splice(index, 1);
                    break;
                }
            }

            chrome.storage.sync.set({ youPhrases: data.youPhrases }, function () { });
        }
    });
}

const storage = {
    clearPhrasesStorage: clearPhrasesStorage,
    savePhrasesStorage: savePhrasesStorage,
    removePhraseStorage: removePhraseStorage
};

