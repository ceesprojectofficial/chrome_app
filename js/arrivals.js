
var ARRIVALS_TABLE = "#forms_arrivals_table_body";

function getArrivals(){
  $.ajax({
    url: getConfigValues('server_url') + getConfigValues('arrivals_endpoint'),
    type: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authentication', token);
    },
    success: fillArrivalsTable
  });
}

function fillArrivalsTable(response){
  view_element('forms_arrivals_table_customers');
  var arrivals = response['data'];
  tbody = $(ARRIVALS_TABLE);
  tbody.empty();
  $.each(arrivals, function(index, value){
    tbody.append("<tr><td>" + value.name + "</td><td>" + value.surname + "</td><td>" 
      + value.age + "</td><td>" + value.sex + "</td><td>" + value.url + "</td><td><button id='forms_arrivals_table_customers_btn_attend' type='submit'  class='btn btn-primary'> ATTEND </button></td></tr>");
  });
}
