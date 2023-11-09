// JavaScript Document

//Open legenda
$('.legenda-open').on('click', function() {
    $('.legenda').addClass('opened');
})
$('.legenda-close, .legenda .open-floor:not(.na)').on('click', function() {
    $('.legenda').removeClass('opened');
})

//click on Home button 
$('.home, .gohome').on('click', function() {
    location.reload();
});
        
//Select the vimeo player for the intro
var loopplayer = new Vimeo.Player($('.introvideo'));

//Select the vimeo player for the tour
var player = new Vimeo.Player($('.tourvideos'));

//Video settings
$(document).ready(function(){
    loopplayer.setVolume(0);
    player.setVolume(0);
});

//Checks if the loop-video is playing
loopplayer.on('loaded', function() {
    setTimeout(function() {
        loopplayer.getPaused().then(function(paused) {
            if (paused) {
               $('.play').fadeIn();
            } else {
                $('.play').hide();
            }
        });
    }, 1400);
});

//Button that starts the tour
$('.starttour').on('click', function() {
    $(this).hide();
    $('.video-container').removeClass('startloop');
    $('.video-container').addClass('startvideos');
    player.setVolume(1);
});

//What happens when video ends
player.on('ended', function() {
    $('.buttons').fadeIn();
});

//Event fires every time a new video loads and checks if it is the exit video
player.on('loaded', function() {
    if($('.exit').hasClass('currentlocation')) {
        $('.video-container').addClass('theexit');
    } else {
        $('.video-container').removeClass('theexit');
    }
});

//When click on open-floor
$('.open-floor:not(.na)').on('click', function() {
    $('.buttons').hide();
    $('.open-floor').removeClass('current-parent');
    $(this).addClass('current-parent');
    var floorclicked = $(this).data("gotofloor");
    $('.verdieping').removeClass('currentlocation');
    $('.'+floorclicked).addClass('currentlocation');
    
    var currentvimeo = $('.locatie').find('.currentvid').data("vimeo-nr");

    $('.locatie').find('.playthisvid').removeClass('currentvid');
    $('.'+floorclicked).find('.playthisvid').first().addClass('currentvid');

    var vimeonr = $('.currentvid').data("vimeo-nr");

    if(currentvimeo == vimeonr) {
        player.setCurrentTime(0);
        player.play();
    } else {
        player.loadVideo(vimeonr).then(function() {
            player.play();
        });
    }
    
});

//Klikken op lokaal in locatie-tab
$('.locatie .playthisvid').on('click', function() {
    $('.buttons').hide();
    var currentvimeo = $('.locatie').find('.currentvid').data("vimeo-nr");
    $('.locatie').find('.playthisvid').removeClass('currentvid');
    $(this).addClass('currentvid');
    var vimeonr = $(this).data("vimeo-nr");
    
    if(currentvimeo == vimeonr) {
        player.setCurrentTime(0);
        player.play();
    } else {
        player.loadVideo(vimeonr).then(function() {
            player.play();
        });
    }

});




//click on play button
$('.play').on('click', function() {
    if($('.video-container').hasClass('startloop')) {
        loopplayer.play();
    }
    player.play();
    $('.play').fadeOut();
});
//click on replay button
$('.replay').on('click', function() {
	
    player.setCurrentTime(0);
    player.play();
	
	$('.legenda').removeClass('opened');
	$('.buttons').fadeOut();
});

//Klikken op 'volgende video' pijl-naar-rechts-knop
$('.playnextvid').on('click', function() {
    $('.buttons').hide();
    var currentdiv = $('.currentvid');
    var nextdiv = currentdiv.nextAll('.playthisvid:first');
    $('.locatie').find('.playthisvid').removeClass('currentvid');
    if ( nextdiv.length){
        nextdiv.addClass('currentvid');
        var vimeonr = nextdiv.data("vimeo-nr");

    player.loadVideo(vimeonr).then(function() {
        player.play();
    });

    } else { 
        var currentlocation = $('.currentlocation');
        var nextlocation = currentlocation.next();
        $('.locatie').find('.verdieping').removeClass('currentlocation');
        var currentfloor = $('.current-parent');
        var nextfloor = currentfloor.nextAll('.open-floor:not(.na):first');
        $('.legenda-content').find('.open-floor').removeClass('current-parent');

        if (nextlocation.length) {
            nextlocation.addClass('currentlocation');
            nextfloor.addClass('current-parent');
            $('.locatie').find('.playthisvid').removeClass('currentvid');
            $('.currentlocation').find('.playthisvid').first().addClass('currentvid');

            vimeonr = $('.currentvid').data("vimeo-nr");

            player.loadVideo(vimeonr).then(function() {
                player.play();
            });

        }
    }
});
