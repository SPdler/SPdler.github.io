var sound = null;

if (!localStorage.getItem('token')) {
    window.location = 'login.html';
}


var downloadTrackFromServer = function (that, id) {

    $(that).text('در حال پردازش...');
    $(that).addClass('disable');

    getMyTrack(id, function (res) {
        console.log(res);
        $(that).removeClass('disable');
        $(that).text('اجرا');
        $(that).addClass('green');
        $(that).attr('onclick', 'play("' + res.data.song + '", "' + $(that).attr('name') + '" , "' + $(that).attr('artist') + '")');
        download(res.data.song, $(that).attr('name'))

    }, function (data) {
        console.log(data);
        $(that).removeClass('disable');
        $(that).text('دریافت');
    })
};


var download = function (url, name) {
    var link = document.createElement("a");
    link.download = '';
    link.href = url;
    link.target = "_blank";
    link.click();
};


var play = function (link, name, artist) {
    $('.player .bubblingG').show();
    $('.player .button').hide();


    $('.player .name').text(name);
    $('.player .artist').text(artist);
    $('.player .play').hide();
    $('.player .pause').hide();

    $('.player ').slideDown();

    if (sound) {
        sound.unload();
    }
    sound = new Howl({
        html5: true,
        src: [link]
    });
    sound.play();

    sound.on('load', function () {
        $('.player .bubblingG').hide();
        $('.player .pause').show();
    });
};


$(document).ready(function () {
    $('.body .bubblingG').hide();


    $('.player .button').click(function () {
        if (sound.playing()) {
            sound.pause();
            $('.player .play').show();
            $('.player .pause').hide();
        }
        else {
            sound.play();
            $('.player .pause').show();
            $('.player .play').hide();
        }
    });


    $('.item').remove();
    $('.error').remove();
    $('.bubblingG').show();

    getMyTracks(function (res) {
        console.log(res);
        $('.bubblingG').hide();

        if (res.data.tracks.data.length == 0)
            $('.body').append('<div class="error"> هنوز هیچ آهنگی را اضافه نکرده‌اید...</div>')


        for (var i = 0; i < res.data.tracks.data.length; i++) {
            $('.body').append('<div class="item"> ' +
                '<img class="photo" src="' + res.data.tracks.data[i].images.medium + '" alt="taylor"> ' +
                '<div class="detail"> ' +
                '<p class="track english">' + res.data.tracks.data[i].name + '</p> ' +
                '<p class="artist">' + res.data.tracks.data[i].artists.data[0].name + '</p> ' +
                '</div> ' +
                '<div class="get" onclick="downloadTrackFromServer(this, \'' + res.data.tracks.data[i].id + '\')" ' +
                'name= "' + res.data.tracks.data[i].name + '" artist="' + res.data.tracks.data[i].artists.data[0].name + '" >دریافت</div> ' +
                '</div>')
        }
    }, function (data) {
        $('.bubblingG').hide();

        if (data.status == 401) {
            window.location = 'login.html';
            localStorage.removeItem('token');
        }
        else {
            $('.body').append('<div class="error">' + data.responseJSON.message + '</div>')
        }

    })

});