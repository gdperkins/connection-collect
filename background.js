// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function sendMessage (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function(){
    chrome.tabs.executeScript(tab.id, { file: 'jquery.js'}, function(){
      chrome.tabs.sendMessage(tab.id, { method: method }, callback);
    });
  });
}

function downloadConnections (tab) {  
  sendMessage(tab, 'downloadConnections', function(response){
    if (response.data.length === 0) {
      alert("Can't find any connection data on this page");
      return;
    }

    var message = "";
    for (i = 0; i < response.data.length; i ++){
      message += response.data[i].key + ": " + response.data[i].value + "\n";
    }
    alert(message);
  });
}

// When the browser action is clicked, call the
// getBgColors function.
chrome.browserAction.onClicked.addListener(downloadConnections);