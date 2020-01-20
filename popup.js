function showPhrasesButton(e) {
    chrome.tabs.executeScript(null,
        {
            code: phraseAction.scriptGetPhrases
        }, function (result) {
            if (result) {
                var concatPhrases = "";
                for (let index = 0; index < result.length; index++) {
                    var obj = phraseAction.createObjectPhrase(result[index]);
                    concatPhrases += " " + obj.text;
                    phraseAction.addPhraseOnList(obj, true);
                }

                phraseAction.copyToClipboard(concatPhrases);
            }
        });
}

function clearPhrasesButton() {
    selectors.seletorListPhrases.html("");
    storage.clearPhrasesStorage();
}

function setEventRemove() {
    $('.remove').on("click", function (element) {
        var line = $(element.target).parents(':eq(2)');
        if (line) {
            line.remove();
            var id = $(element.target).parents(':eq(2)').prop("id");
            storage.removePhraseStorage(id);
        }
    });
}

function initPopup() {
    document.addEventListener('DOMContentLoaded', function () {
        $('#showPhrasesButton').on("click", showPhrasesButton);
        $('#clearPhrasesButton').on("click", clearPhrasesButton);
    });

    chrome.storage.sync.get('youPhrases', function (data) {
        if (data.youPhrases) {
            for (let index = 0; index < data.youPhrases.length; index++) {
                phraseAction.addPhraseOnList(data.youPhrases[index], false);
            }
        }

        setTimeout(function () {
            setEventRemove();
        }, 1000);
    });
}

initPopup();
