/*
File: cees.js
Author: Carlos Vazquez (cees.project.official@gmail.com)
Date: 2014/06/29
Description: Functions used to implement the transitions between the different screens of the UI. Basically this file
contains functions to modify the visibility of html elements
*/

//###############################################################################
// CEES Functions
// Functions used to implement the transitions between the different screens of the UI. Basically this file
// contains functions to modify the visibility of html elements
//###############################################################################


//--------------------------------------------------------------------------
// Function reloadApp
// 
// Implements logout. 
// This fuction restart the application and reinitialize all the variables
//--------------------------------------------------------------------------

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
// hide the element given as parameter (id)
// setting property 'display' to 'none'
//--------------------------------------------------------------------------

function hide_element(id){
  // Gettting id element
  var el = document.getElementById(id); //el variable defintion
  el.style.display = "none" ; //set el's display attribute to none
}

//--------------------------------------------------------------------------
// Function occult_element
// hide the element given as parameter (id)
// setting property 'visibility' to 'hidden'
//--------------------------------------------------------------------------

function occult_element(id){
   // Gettting id element
  var el = document.getElementById(id); //el variable defintion
  el.style.visibility = "hidden" ; //set el's visibility attribute to hidden 

}

//--------------------------------------------------------------------------
// Function show_element
// show the element given as parameter (id)
// setting property 'display' to 'block'
//--------------------------------------------------------------------------

function show_element(id){
  // Gettting id element
  var el = document.getElementById(id); //el variable defintion
  el.style.display = "block"; //set el's display attribute to block
}

//--------------------------------------------------------------------------
// Function view_element
// show the element given as parameter (id)
// setting property 'display' to 'block'
//--------------------------------------------------------------------------

function view_element(id){
  // Gettting id element
  var el = document.getElementById(id); //el variable defintion
  el.style.visibility = "visible"; //set el's visibility attribute to visible
}

//--------------------------------------------------------------------------
// Function clean_table
// Clean all the information stored in the table passed as parameter. Get the table id empty
// Used when the user logs out and the reloading of the application is needed plus 
// the initializing of specific html elements
//--------------------------------------------------------------------------

function clean_table(id){
  tbody = $(id);
  tbody.empty();
}

