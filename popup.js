function showPhrasesButton(e) {
    chrome.tabs.executeScript(null,
        {
            code: selectors.scriptCodeShowPhrases
        }, function (result) {
            if (result) {
                helper.addPhrasesOnList(result, true);
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
            storage.removePhraseStorage(line.text());
        }
    });
}

function initPopup() {
    document.addEventListener('DOMContentLoaded', function () {
        $('#showPhrasesButton').on("click", showPhrasesButton);
        $('#clearPhrasesButton').on("click", clearPhrasesButton);
    });

    chrome.storage.sync.get('youPhrases', function (data) {
        if (data.youPhrases)
            helper.addPhrasesOnList(data.youPhrases, false);

        setTimeout(function () {
            setEventRemove();
        }, 1000);
    });
}

initPopup();
