$(document).ready(function () {

  $('#box .login').click(function () {
    $('.error').remove();
    $('.login').text('در حال پردازش ...');
    var email = $('.email').val();
    var password = $('.password').val();
    var uuid = getUUID();
    $('.login').addClass('disable');


    login(email, password, uuid, platform.os.family, platform.os.version, 'Desktop', 'Webapp', appVersion, 'Desktop', function (data) {
      localStorage.setItem('token', data.token);
      window.location = 'profile.html';
    }, function (data) {
      $('#box').after('<div class="error">' + data.responseJSON.message + '</div>');
      $('.login').text('ورود');
      $('.login').removeClass('disable');
    })

  })
});