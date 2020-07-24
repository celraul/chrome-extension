function createObjectPhrase(phrase) {
    return { id: guid(), text: phrase };
}

function addPhrasesOnListByYoutubeLegends(text) {
    if (text) {
        var obj = createObjectPhrase(text);
        phraseAction.addPhraseOnList(obj, true);
        phraseAction.copyToClipboard(text);
    }
}

function addPhraseOnList(phrase, addStorage) {
    if (phrase && phrase.text) {
        selectors.seletorListPhrases.prepend(returnElementPhraseLine(phrase));
        if (addStorage)
            storage.savePhrasesStorage(phrase);

        setEventRemove(phrase.id);
    }
}

function setEventRemove(id) {
    var selector = $("#" + id);
    if (selector) {
        selector.find('.remove').on("click", function (element) {
            selector.remove();
            storage.removePhraseStorage(id);
        });
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
    var li = `
    <l1 class='item-phrase' id='${obj.id}'> 
        <span class='text'>${obj.text} </span>
        <span class='icons'>
            <a title='Google Translate.' href="https://translate.google.com/#view=home&op=translate&sl=en&tl=pt&text=${obj.text}" target='blank'>
                <i class='fa fa-external-link-square' aria-hidden='true'></i> 
            </a>
            <a class='remove'> <i class='fa fa-trash-o' aria-hidden='true' title='Remove phrase.'></i> </a> 
        </span> 
    </li> 
    </br>`;

    return li;
}

const copyToClipboard = str => {
    if (str) {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    }
};

const selectors = {
    seletorListPhrases: $('#list-phrases')
};

const phraseAction = {
    addPhrasesOnListByYoutubeLegends: addPhrasesOnListByYoutubeLegends,
    addPhraseOnList: addPhraseOnList,
    copyToClipboard: copyToClipboard
}
