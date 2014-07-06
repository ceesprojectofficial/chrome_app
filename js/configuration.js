var config = {
  //License Key
  "license_key" : "e8e38c68-b13c-473d-a7df-ca83d4c82727",

  //Server definitions
  "server_url" : "https://80.240.139.49/",
  "login_endpoint" : "shopassistants/login/",
  "checkin_endpoint" : "shopassistants/checkin/",
  "arrivals_endpoint" : "clients/arrivals/",
  "gcm_endpoint" : "gcm/registration/",

  //Device
  "mac_address" : "00:0C:29:18:6C:1A",

  //Registration flag
  "is_registered" : false
}

function getConfigValues(key){
  return config[key];
}