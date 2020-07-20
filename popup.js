function copyPhraseButton(e) {
    chrome.tabs.executeScript(null,
        { file: "js/execute-scripts/get-phrases.js" },
        function (result) {
            if (result)
                phraseAction.addPhrasesOnListByYoutubeLegends(result[0]);
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
        $('#copyPhraseButton').on("click", copyPhraseButton);
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
