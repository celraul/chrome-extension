chrome.commands.onCommand.addListener(function (command) {
  if (command == "save-phrase") {
    chrome.tabs.executeScript(null,
      { file: "app/execute-scripts/get-phrases.js" },
      function (result) {
        if (result)
          phraseAction.addPhrasesOnListByYoutubeLegends(result[0]);
      });
  }
});
