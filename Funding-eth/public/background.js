window.data = "";
function activeNewTab() {
  const { chrome } = window;
  console.log(chrome);
  if (!chrome) {
    return;
  }
  chrome.browserAction.onClicked.addListener(function() {
    const url = chrome.extension.getURL("index.html");
    if (window.tabId) {
      chrome.tabs.update(window.tabId, { selected: true });
    } else {
      chrome.tabs.create({ url }, function(tab) {
        window.tabId = tab.id;
      });
    }
  });
  chrome.tabs.onRemoved.addListener(function(tabId) {
    if (tabId === window.tabId) {
      window.tabId = null;
      window.data = "";
    }
  });

}

function setLoginTimer(time) {
  if (window.loginTimer) {
    clearTimeout(window.loginTimer);
  }
  window.loginTimer = setTimeout(function() {
    reloadSimplug();
  }, time * 60 * 1000);
}

function reloadSimplug() {
  chrome.storage.local.get("Simplug-User", function(result) {
    const userInfo = result["Simplug-User"] && JSON.parse(result["Simplug-User"]);
    if (userInfo && userInfo.address) {
      userInfo.address = "";
      chrome.storage.local.set(
        {
          "Simplug-User": JSON.stringify(userInfo)
        },
        function() {
          if (window.tabId) {
            chrome.tabs.reload(window.tabId);
          }
        }
      );
    } else {
      return false;
    }
  });
}



activeNewTab();
