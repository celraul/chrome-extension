chrome.commands.onCommand.addListener(function (command) {
  if (command == "save-phrase") {
    chrome.tabs.executeScript(null,
      { file: "js/execute-scripts/get-phrases.js" },
      function (result) {
        if (result)
          phraseAction.addPhrasesOnListByYoutubeLegends(result[0]);
      });
  }
});
