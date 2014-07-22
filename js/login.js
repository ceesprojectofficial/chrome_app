/*
File: login.js
Author: Fernando Crespo Gravalos (cees.project.official@gmail.com)
Date: 2014/06/29
Description: Functions related to login process.
*/
EMAIL_INPUT = $("#forms_login_input_email");
PASSWORD_INPUT = $("#forms_login_input_password");
var token = "";

/*
Function login.
Sends a POST request to Web Service.
The data attached to the request will be the email, password and mac_address.
*/

function login(){
  data = getLoginData();
  $.ajax({
    url: getConfigValues('server_url') + getConfigValues('login_endpoint'),
    type: 'POST',
    data: data,
    success: loginCallBack,
    dataType: 'json'
  });
}

function logout(){
  $.ajax({
    url: getConfigValues('server_url') + getConfigValues('login_endpoint'),
    type: 'DELETE',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authentication', token);
    },
  });
  chrome.storage.local.set({checked_in: false});
  reloadApp();
}

/*
Function getLoginData
Returns login data retrieved from form (email and password) and config (MAC)
*/

function getLoginData(){
  var email = EMAIL_INPUT.val();
  var password = PASSWORD_INPUT.val();
  var mac_address = getConfigValues("mac_address");
  return {"email" : email, "password" : password, "macAddress" : mac_address};
}

/*
Function loginCallBack
Called in case of login success.
*/
function loginCallBack(response){
  hide_element ('forms_login');
  token = response['data'];
  getStores(token);
}

function clear(){
  EMAIL_INPUT.val('');
  PASSWORD_INPUT.val('');
}

$('#forms_login_btn_login').click(login);// Adding handler to forms_login_btn_submit button
$('#forms_login_btn_logout').click(logout);  // Adding handler to forms_login_btn_logout button
$('#forms_login_btn_clear').click(clear);// Adding handler to forms_login_btn_clear  button