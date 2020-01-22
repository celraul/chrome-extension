chrome.commands.onCommand.addListener(function (command) {
  if (command == "save-phrase") {
    chrome.tabs.executeScript(null,
      {
        code: phraseAction.scriptGetPhrases
      }, function (result) {
        phraseAction.addPhrasesOnListByYoutubeLegends(result);
      });
  }
});
