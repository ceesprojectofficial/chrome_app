//###############################################################################
// CEES Functions
// Set of functions used by UI to communicates with FE and provide information
// and interact with end user
//###############################################################################

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

//--------------------------------------------------------------------------
// Function show_element
// show the element passed as parameter (id)
// setting property display to block
//--------------------------------------------------------------------------

function show_element(id){
//se obtiene el id
var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
el.style.display = "block" ; //damos un atributo display:block que oculta el div

}


//--------------------------------------------------------------------------
// Function view_element
// show the element passed as parameter (id)
// setting property visivility to visible
//--------------------------------------------------------------------------

function view_element(id){
//se obtiene el id
var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
el.style.visibility =  "visible" ; //damos un atributo display:none que oculta el div

}


//--------------------------------------------------------------------------
// Function login
// Manage the request to send "user, password & Mac address" to the FE and 
// receive a TOKEN to interact with the FE further
// Transition to the Checkin screen in case positive response
//--------------------------------------------------------------------------


function login(){



// POST Request to front-end	

var http = new XMLHttpRequest();
http.open("POST", "https://80.240.139.49/shopassistants/login/", true);
http.setRequestHeader("Content-type", "application/json");
data = {"email" : "sa.test@cees.com", "password":"test1234", "macAddress":"00:0C:29:18:6C:1E"}
http.send(JSON.stringify(data));
 
// Check response status in http 
 
// in case status OK --> UI transiction screen
	hide_element ('forms_login');
	show_element ('forms_p_welcome');
	show_element ('forms_stores');
	// Render the response (stores) on the forms_stores_select_country (select_field)
	
// UI else error message 


}



//--------------------------------------------------------------------------
// Function checkin
// Manage the request to send  to the FE the stores's identifiers where 
// the user is to checkin. Request status  is also received
// receive a the list of clients currently into the selected store 
// Transition to the Arrivals screen in case positive response
//--------------------------------------------------------------------------

function checkin(){
	
// call to BE to retrieve clients presentes in the store selected


// UI transiction screen in case positive response


hide_element ('forms_stores');
hide_element ('forms_arrivals_img_initial');
show_element ('forms_img_banner');
show_element ('forms_logout');



// Render the response (client_list) on the forms_arrivals_table_customers (table)

	//By the momment just show a static table further a specific function will build dinamically the table based onthe JSON sent by the BE


}

//--------------------------------------------------------------------------
// Function checkout
// Manage the request to checkout from the store. 
// It just receive a response status
// Transition to the checkin screen in case positive response
//--------------------------------------------------------------------------


function checkout(){

// Call to BE to checkuot 

// UI transiction screen

show_element ('forms_arrivals_img_initial');
show_element ('forms_login');
hide_element ('forms_img_banner');
hide_element ('forms_logout');
hide_element ('forms_arrivals_table_customers');

}



//});


document.getElementById('forms_login_btn_login').addEventListener('click',login);// Adding handler to forms_login_btn_submit button

document.getElementById('forms_login_btn_clear').addEventListener('click',login);// Adding handler to forms_login_btn_clear  button

document.getElementById('forms_stores_btn_submit').addEventListener('click',checkin);// Adding handler to forms_stores_btn_submit button

document.getElementById('forms_login_btn_logout').addEventListener('click',checkout);// Adding handler to forms_login_btn_logout button