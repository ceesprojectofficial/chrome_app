/*
File: login.js
Author: Fernando Crespo Gravalos (cees.project.official@gmail.com)
Date: 2014/06/29
Description: Functions related to chekin process.
*/

//constants for drop-down lists selectors.
var CITY_SELECTOR =  "#forms_stores_select_city";
var ADDRESS_SELECTOR = "#forms_stores_select_address";
var PLACEHOLDER = "---";

/*
Function getStores.
Retrieves the stores list available for a shop asistant.
Require authentication token.
*/
function getStores(token){
  $.ajax({
      url: getConfigValues('server_url') + getConfigValues('checkin_endpoint'),
      type: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authentication', token);
      },
      success: fillStoreSelectors
    });
}

/*
Function checkin.
Change the ui appeareance.
Save the presence of a shop assistant in a store sending a POST message with the attached store (city and address).
Require authentication token.
*/

function checkin(token){
  // call to BE to retrieve clients presentes in the store selected
  // UI transiction screen in case positive response
  hide_element ('forms_stores');
  hide_element ('forms_arrivals_img_initial');
  show_element ('forms_img_banner');
  show_element ('forms_logout');
  // Render the response (client_list) on the forms_arrivals_table_customers (table)
  //By the momment just show a static table further a specific function will build dinamically the table based onthe JSON sent by the BE
}

/*
Function checkout.
Change the ui appeareance.
Save the presence of a shop assistant in a store sending a DELETE message.
Require authentication token.
*/

function checkout(token){
  // Call to BE to checkuot 
  // UI transiction screen
  show_element ('forms_arrivals_img_initial');
  show_element ('forms_login');
  hide_element ('forms_img_banner');
  hide_element ('forms_logout');
  hide_element ('forms_arrivals_table_customers');
}

/*
Function illStoreSelectors.
Change the ui appeareance.
Fills city and address selectors.
*/

function fillStoreSelectors(response){
  show_element ('forms_p_welcome');
  show_element ('forms_stores');
  var stores = response['data'];
  var cities = stores['cities'];
  $.each(cities, function(index, value){
    $(CITY_SELECTOR).append("<option>" + value + "</option>");          
  });
  $(CITY_SELECTOR).change(function(){
    $(ADDRESS_SELECTOR).empty();
    var city = $(CITY_SELECTOR).val();
      if (city == PLACEHOLDER){
        $(ADDRESS_SELECTOR).append("<option>" + PLACEHOLDER + "</option>"); 
      }
      else{
        var addresses = stores[city];
        $.each(addresses, function(index, value){
        $(ADDRESS_SELECTOR).append("<option>" + value + "</option>");
      });
    }
  });
}

$('#forms_stores_btn_submit').click(checkin);  // Adding handler to forms_stores_btn_submit button
$('#forms_login_btn_logout').click(checkout);  // Adding handler to forms_login_btn_logout button
