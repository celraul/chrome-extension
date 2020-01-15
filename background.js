chrome.commands.onCommand.addListener(function (command) {
  if (command == "save-phrase") {
    chrome.tabs.executeScript(null,
      {
        code: selectors.scriptCodeShowPhrases
      }, function (result) {
        helper.addPhrasesOnList(result, true);
      });
  }
});
