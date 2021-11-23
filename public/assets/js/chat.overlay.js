var options = {
    delayBeforeStart: 0,
    direction: 'left'
};

function showMarquee(id, component) {
    $('.app').append(component);

    newOption = options
    newOption.speed = (getRandomInt(450, 700) / 100) * 1000;
    fontSize = getRandomInt(20, 36);
    
    height = $(window).height() - fontSize - 15;
    randomTop = getRandomInt(1, height)

    zIndex = getRandomInt(1, 1000);

    $('#'+id).css({
        'top': randomTop+'px', 
        'font-size': fontSize,
        'font-weight': '600',
        'z-index': zIndex,
        'vertical-align':'middle'});

    if (component.indexOf("img") >= 0) {
        componentHeight = $('#'+id).height();
        $('#img-' + id).css({
            'height': componentHeight,
            'vertical-align':'middle'
        });
    }
    $('#'+id).bind('finished', function() {
        $(this).marquee('destroy');
        $('#'+id).remove();
    }).marquee(newOption);
}

const onChat = function(data) {
    marqueeComponent = '<div id=' + data.id + ' class="marquee">' + data.frm + ': ' + data.msg + '</div>';
    showMarquee(data.id, marqueeComponent);
}

const onGift = function(data) {
    marqueeComponent = '<div id=' + data.id + ' class="marquee">' + data.frm + ' ' + data.gift_id + ' ' + data.title_id + ' <img id="img-' + data.id + '" src="' + data.icon + '" alt="' + data.title_id + '"/>' + '</div>';
    showMarquee(data.id, marqueeComponent);
}


callbacks = setCallbacks(onChat, null, null, null, null, null, onGift);
connect(guardURL, callbacks);