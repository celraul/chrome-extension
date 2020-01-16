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
        var concatPhrases = "";
        for (var i = 0; i < phrases.length; i++) {
            if (phrases[i]) {
                selectors.seletorListPhrases.append("<l1 class='item-phrase'>" + phrases[i] + "</li>");

                concatPhrases += " " + phrases[i];

                if (addStorage)
                    storage.savePhrasesStorage(phrases[i]);
            }
        }

        copyToClipboard(concatPhrases);
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

const copyToClipboard = str => {
    if (str) {
        const el = document.createElement('textarea');  // Create a <textarea> element
        el.value = str;                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
        el.style.position = 'absolute';
        el.style.left = '-9999px';                      // Move outside the screen to make it invisible
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        const selected =
            document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0)     // Store selection if found
                : false;                                    // Mark as false to know no selection existed before
        el.select();                                    // Select the <textarea> content
        document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
            document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
            document.getSelection().addRange(selected);   // Restore the original selection
        }
    }
};