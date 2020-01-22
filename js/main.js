function createObjectPhrase(phrase) {
    return { id: guid(), text: phrase[0] };
}

function addPhrasesOnListByYoutubeLegends(phrases){
    if (phrases) {
        var concatPhrases = "";
        for (let index = 0; index < phrases.length; index++) {
            var obj = createObjectPhrase(phrases[index]);
            concatPhrases += " " + obj.text;
            phraseAction.addPhraseOnList(obj, true);
        }

        phraseAction.copyToClipboard(concatPhrases);
    }
}

function addPhraseOnList(phrase, addStorage) {
    if (phrase && phrase.text) {
        selectors.seletorListPhrases.append(returnElementPhraseLine(phrase));

        if (addStorage)
            storage.savePhrasesStorage(phrase);
    }
}

function guid() {
    var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var str = "";
    for (var i = 0; i < 36; i++) {
        var str = str + ((i == 8 || i == 13 || i == 18 || i == 23) ? "-" : chars[Math.floor(Math.random() * chars.length)]);
    };
    return str;
}

function returnElementPhraseLine(obj) {
    return "<l1 class='item-phrase' id='" + obj.id + "' > <span class='text'>" +
        obj.text + "</span> <span class='icons'> <a title='Google Translate.'" + 'href="https://translate.google.com/#view=home&op=translate&sl=en&tl=pt&text=' + obj.text + '"' + " target='blank'><i class='fa fa-external-link-square' aria-hidden='true'></i> </a>" +
        "<a class='remove'> <i class='fa fa-trash-o' aria-hidden='true' title='Remove phrase.'></i> </a> </span> </li> </br> ";
}

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

const selectors = {
    seletorListPhrases: $('#list-phrases')
};

const storage = {
    clearPhrasesStorage: clearPhrasesStorage,
    savePhrasesStorage: savePhrasesStorage,
    removePhraseStorage: removePhraseStorage,
    saveConfig: saveConfig,
};

const phraseAction = {
    addPhrasesOnListByYoutubeLegends: addPhrasesOnListByYoutubeLegends,
    addPhraseOnList: addPhraseOnList,
    copyToClipboard: copyToClipboard,
    scriptGetPhrases: `(function() {
        var selector = document.getElementsByClassName("caption-visual-line");
        if(selector){
            var array = [];
            var phrase = '';
           
            for (var i = 0; i < selector.length; i++) {
                var children = selector[i].children;
                if(children){
                    for (var j = 0; j < children.length; j++) {
                        if(children[j] && children[j].innerHTML)
                            phrase += children[j].innerHTML; 
                    }
                }
            }

            if(phrase !== '')
                array.push(phrase);
    
            return array;
        }

       return null;
    })();`,
}
