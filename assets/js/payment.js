

$(document).ready(function () {
  $('.pay').click(function () {
    $('.pay').text('در حال پردازش ...');
    $('.pay').addClass('disable');

    payment('salam', function (res) {
      window.open(res.data.url, '_blank');

      console.log(res.data);
    }, function (err) {
      $('.pay').text('پرداخت');
      $('.pay').removeClass('disable');
    })
  })
});