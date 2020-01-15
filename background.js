chrome.commands.onCommand.addListener(function (command) {

  if (command == "salvar-legenda") {
    // TODO criar alerta
    chrome.tabs.executeScript(null,
      {
        code: selectors.scriptCodeCapturarlegenda
      }, function (result) {

        helper.addPhrasesOnList(result, true);
        //chrome.browserAction.setBadgeText({ text: 'ON' });

      });
  }

});
