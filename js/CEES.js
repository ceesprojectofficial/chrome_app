/*
File: cees.js
Author: Carlos Vazquez (cees.project.official@gmail.com)
Date: 2014/06/29
Description: Functions related to login process.
*/

//###############################################################################
// CEES Functions
// Set of functions used by UI to communicates with FE and provide information
// and interact with end user
//###############################################################################



function reloadApp(){
appwindow = chrome.app.window.current();
chrome.app.window.create('window.html', {
  'bounds': {
    'width': Math.round(window.screen.availWidth),
    'height': Math.round(window.screen.availHeight)
  }}, function(){
        appwindow.close();
    });
}
//--------------------------------------------------------------------------
// Function hide_element
// hide the element passed as parameter (id)
// setting property display to none
//--------------------------------------------------------------------------

function hide_element(id){
  //se obtiene el id
  var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
  el.style.display = "none" ; //damos un atributo display:none que oculta el div
}

function occult_element(id){
  var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
  el.style.visibility = "hidden" ; //damos un atributo display:block que oculta el div

}

//--------------------------------------------------------------------------
// Function show_element
// show the element passed as parameter (id)
// setting property display to block
//--------------------------------------------------------------------------

function show_element(id){
  //se obtiene el id
  var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
  el.style.display = "block"; //damos un atributo display:block que oculta el div
}

function view_element(id){
  //se obtiene el id
  var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
  el.style.visibility = "visible"; //damos un atributo display:block que oculta el div
}

function clean_table(id){
  tbody = $(id);
  tbody.empty();
}

