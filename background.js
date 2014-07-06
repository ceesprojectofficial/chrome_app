// JavaScript Document

function firstTimeRegistration(){
  console.log("ENTRO");
  chrome.storage.local.get("is_registered", function(result) {
    // If already registered, bail out.
    if (result["is_registered"] == true){
      console.log(result["is_registered"]);
      chrome.app.window.create('window.html', {
        'bounds': {
        'width': Math.round(window.screen.availWidth),
        'height': Math.round(window.screen.availHeight)
        }
      });
    }
    else {
      getProjectId();
      
    }
    
  });
}
chrome.runtime.onInstalled.addListener(function() {
   firstTimeRegistration();
});

chrome.app.runtime.onLaunched.addListener(function() {
  firstTimeRegistration();
});

function setSenderId(senderId){
  senderId = senderId;
}
function getSenderId(){
  return senderId;
}
function getProjectId(){
  data = getConfigValues('license_key');
  console.log(data);
  $.ajax({
    url: getConfigValues('server_url') + getConfigValues('gcm_endpoint'),
    type: 'GET',
    data: "arg0=" + data,
    success: projectCallBack
  });
}

function projectCallBack(response){
  var senderId = response['data'];
  var senderIds = [senderId];
  console.log(senderId);
  chrome.gcm.register(senderIds, registerCallback);
}

function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    return;
  }

  // Send the registration ID to your application server.
  sendRegistrationId(registrationId, function(succeed) {
    // Once the registration ID is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed){
      chrome.storage.local.set({is_registered: true});
    }
  });
}

function sendRegistrationId(regId, callback) {  
  // Send the registration ID to your application server
  // in a secure way.
  console.log(regId);
  data = {"macAddress" : getConfigValues('mac_address'), "registrationID" : regId};
  $.ajax({
    url: getConfigValues('server_url') + getConfigValues('gcm_endpoint'),
    type: 'POST',
    data: data,
    success: callback
  });
}

function messageReceived(message) {
    // A message is an object with a data property that
    // consists of key-value pair;s.
    console.log("ENTROOOOOO");
    // Returns a new notification ID used in the notification.
    function getNotificationId() {
      var id = Math.floor(Math.random() * 9007199254740992) + 1; 
      //Stores latest notification ID so that event handlers can access
      //notification when background page is closed.
      chrome.storage.local.set({'id': id});
      return id.toString();
    }
  
    // Concatenate all key-value pairs to form a display string.
    var messageString = "";
    for (var key in message.data) {
      if (messageString != "")
        messageString += ", "
      messageString += key + ":" + message.data[key];
    }
  
    // Pop up a notification to show the GCM message.
    chrome.notifications.create(getNotificationId(), {
      title: 'New arrival',
      iconUrl: 'cees-128.png',
      type: 'basic',
      message: messageString
    }, function(){});
  }
  
chrome.gcm.onMessage.addListener(messageReceived);



