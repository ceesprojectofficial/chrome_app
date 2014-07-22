
var ws = new WebSocket('ws://192.168.1.38:8080');
ws.onopen = function() {
  console.log("CONNECTED.")
  ws.send('CEES_CHROME_APP');
}

ws.onmessage = function(msg){
  console.log(msg);
  chrome.storage.local.get("checked_in", function(result) {
  	if (result["checked_in"] == true){
  		getArrivals();
  	}
  });
}


