// JavaScript Document
var locked = true;

function unLock(){
  locked = false;
}

chrome.runtime.onInstalled.addListener(function() {
   chrome.storage.local.set({is_registered:false});
});

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.storage.local.get("is_registered", function(result) {
    // If already registered, bail out.
    if (result["is_registered"] == true){
      chrome.app.window.create('window.html', {
        'bounds': {
        'width': Math.round(window.screen.availWidth),
        'height': Math.round(window.screen.availHeight)
        }
      });
    }
    else {
      getProjectId();
      /*senderId = chrome.storage.local.get('senderId', function(result){
        if (chrome.runtime.lastError){
          return ;
          }
        console.log("PRIMERA:" + senderId);
        return senderId;
      });*/
      //while(locked){;}
      
    }
    
   });
  
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
    success: projectCallBack,
    complete: unLock
  });
}

function projectCallBack(response){
  var senderId = response['data'];
  var senderIds = [senderId];
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
      console.log("ENTRO AQUI");
    }
  });
}

function sendRegistrationId(regId, callback) {
  // Send the registration ID to your application server
  // in a secure way.
  console.log(regId);
}

