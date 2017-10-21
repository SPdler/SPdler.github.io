var api = 'http://159.203.106.241/api';
var appVersion = '1.0.0';



function randomString(length) {
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function getUUID() {
  var uuid;

  if(localStorage.getItem('uuid')) {
    uuid = localStorage.getItem('uuid');
    return uuid;
  }
  else {
    uuid = randomString(32);
    localStorage.setItem('uuid', uuid);
    return uuid;
  }

}



function register(email, password, success, error) {
    $.ajax({
      type: "POST",
      url: api + '/register',
      data: {
        email: email,
        password: password
      },
      success: success,
      error: error
    });
}

function login(email, password, uuid, os, os_version, device_type, device_name, app_version, store, success, error) {
    $.ajax({
      type: "POST",
      url: api + '/authenticate',
      data: {
        email: email,
        password: password,
        uuid: uuid,
        os: os,
        os_version: os_version,
        device_type: device_type,
        device_name: device_name,
        app_version: app_version,
        store: store
      },
      success: success,
      error: error
    });
}


function search(query, success, error) {
  $.ajax({
    type: "GET",
    url: api + '/search',
    headers: {
      "Authorization" : 'bearer ' + localStorage.getItem('token')
    },
    data: {
      query: query
    },
    success: success,
    error: error
  });
}

function payment(callbackLink, success, error) {
  $.ajax({
    type: "Post",
    url: api + '/transactions/create',
    headers: {
      "Authorization" : 'bearer ' + localStorage.getItem('token')
    },
    data: {
      callback: callbackLink
    },
    success: success,
    error: error
  });
}



function getTrack(id, success, error) {
  $.ajax({
    type: "POST",
    url: api + '/spotifyTracks/request',
    headers: {
      "Authorization" : 'bearer ' + localStorage.getItem('token')
    },
    data: {
      id: id
    },
    success: success,
    error: error
  });
}

function getMyTrack(id, success, error) {
  $.ajax({
    type: "GET",
    url: api + '/spotifyTracks/' + id,
    headers: {
      "Authorization" : 'bearer ' + localStorage.getItem('token')
    },
    success: success,
    error: error
  });
}


function getMyTracks(success, error) {
  $.ajax({
    type: "GET",
    url: api + '/spotifyTracks/my',
    headers: {
      "Authorization" : 'bearer ' + localStorage.getItem('token')
    },
    success: success,
    error: error
  });
}


//
// $( document ).ajaxError(function(a, b, c) {
//   console.log(a, b, c);
// });