/*
File: login.js
Author: Fernando Crespo Gravalos (cees.project.official@gmail.com)
Date: 2014/06/29
Description: Functions related to login process.
*/

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

function logout(token){

}

/*
Function getLoginData
Returns login data retrieved from form (email and password) and config (MAC)
*/

function getLoginData(){
  var email = $("#forms_login_input_email").val();
  var password = $("#forms_login_input_password").val();
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



$('#forms_login_btn_login').click(login);// Adding handler to forms_login_btn_submit button
$('#forms_login_btn_clear').click(logout);// Adding handler to forms_login_btn_clear  button