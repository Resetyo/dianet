$.fn.customCarousel = function(option) {
    //carousel listing
    var th = $(this);
    th.addClass('custom-carousel');
    var l = th.find(".item").last();
    th.find(".item").css({'z-index': '1', 'display': 'block', 'opacity': '0'});
    var i = th.find(".item:eq( 0 )").addClass('item-first')
        .css({'z-index': '3', 'width': '100%', 'opacity': '1'});
    var sec = th.find(".item:eq( 1 )").addClass('item-second')
        .css({'z-index': '2', 'opacity': '1'});
    th.find(".item:eq( 2 )").addClass('item-third')
        .css({'z-index': '1', 'opacity': '1'});
    th.find('.custom-carousel__controls .up')
        .css({'opacity': '0.5', 'cursor': 'default'});
    if(sec.length == 0) {
        th.find('.custom-carousel__controls').hide();
    }

    th.on("click", ".up", clickUp);
    th.on("click", ".down", clickDown);

    function clickUp(e){
        e.preventDefault();
        th = $(this);
        var f = th.parent().parent().find(".item-first");
        var s = th.parent().parent().find(".item-second");
        var t = th.parent().parent().find(".item-third");
        if (!i.hasClass('item-first')) {
            f.prev()
                .css({'top': '1.4vw', 'opacity': '1', 'z-index': '4', 'width': '100%'})
                .fadeIn()
                .addClass('item-first');
            f.css({'top': '0.7vw', 'left': '3%', 'width': '94%', 'z-index': '3'})
                .removeClass('item-first').addClass('item-second');
            s.css({'top': '0vw', 'left': '6%', 'width': '88%', 'z-index': '2'})
                .removeClass('item-second').addClass('item-third');
            t.css({'display': 'none'}).removeClass('item-third');
            
            if(f.prev().prev().length == 0){
                th.css({'opacity': '0.5', 'cursor': 'default'});
            }

            th.next().css({'opacity': '1', 'cursor': 'pointer'});
        }
        backgroundblur();
    }

    function clickDown(e){
        e.preventDefault();
        th = $(this);
        if (!l.hasClass('item-first')) {
            var n = th.parent().parent().find(".item-third").next();
            var f = th.parent().parent().find(".item-first");
            var s = th.parent().parent().find(".item-second");
            var t = th.parent().parent().find(".item-third");
            f.css({'top': '4vw', 'opacity': '0', 'z-index': '1'})
                .removeClass('item-first');
            s.css({'top': '1.4vw', 'left': '0%', 'opacity': '1', 'width': '100%', 'z-index': '4'})
                .removeClass('item-second').addClass('item-first');
            t.css({'top': '0.7vw', 'left': '3%', 'width': '94%', 'z-index': '3'})
                .removeClass('item-third').addClass('item-second');
            n.show()
                .css({'top': '0vw', 'left': '6%', 'opacity': '1', 'width': '88%', 'z-index': '2' })
                .addClass('item-third');

            if(s.next().length == 0){
                th.css({'opacity': '0.5', 'cursor': 'default'});
            }

            th.prev().css({'opacity': '1', 'cursor': 'pointer'});
        }
        backgroundblur();
    }

    //carousel background blur
    backgroundblur(false);
    function backgroundblur(i = true) {
        var c = $('.custom-carousel_blur');
        if(c.length > 0 ) {
            u = c.find('.up');
            d = c.find('.down');
            f = c.find('.item-first');
            c = c.add(u).add(d).add(f);
            c.mouseover(function() {
                f.addClass('custom-carousel_blured');
            });
            c.mouseout(function() {
                f.removeClass('custom-carousel_blured');
            });
            if(i && !f.hasClass('custom-carousel_blured')){
                f.addClass('custom-carousel_blured');
            }
        }
    }
}