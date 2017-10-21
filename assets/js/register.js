$(document).ready(function () {



  $('#box .register').click(function () {
    $('.error').remove();
    $('.register').text('در حال پردازش ...');
    var email = $('.email').val();
    var password = $('.password').val();
    var uuid = getUUID();
    $('.pay').addClass('disable');

    register(email, password, function (data) {
      console.log('ok', data.responseJSON);

      login(email, password, uuid, platform.os.family, platform.os.version, 'Desktop', 'Webapp', appVersion, 'Desktop', function (data) {
        localStorage.setItem('token', data.token);
        window.location = 'profile.html';
      }, function () {
        $('#box').after('<div class="error">' + data.responseJSON.message + '</div>');
        $('.register').text('ثبت‌نام');
        $('.register').removeClass('disable');
      })

    }, function (data) {
      $('#box').after('<div class="error">' + data.responseJSON.message + '</div>');
      $('.register').text('ثبت‌نام');
      $('.register').removeClass('disable');
    });
  })
});