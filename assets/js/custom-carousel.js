$.fn.customCarousel = function(option) {
    //carousel listing
    var th = $(this);
    th.addClass('custom-carousel');
    var l = th.find(".item").last();
    th.find(".item")
        .removeClass('item-first')
        .removeClass('item-second')
        .removeClass('item-third')
        .css({'z-index': '-1', 'display': 'block', 'opacity': '0'});
    var i = th.find(".item:eq( 0 )")
        .addClass('item-first')
        .css({'z-index': '3', 'width': '100%', 'opacity': '1', 'top': '1.4vw'});
    var sec = th.find(".item:eq( 1 )")
        .addClass('item-second')
        .css({'z-index': '2', 'opacity': '1', 'width': '94%', 'top': '0.7vw', 'left': '3%'});
    th.find(".item:eq( 2 )")
        .addClass('item-third')
        .css({'z-index': '1', 'opacity': '1', 'width': '88%', 'top': '0', 'left': '6%'});
    th.find('.custom-carousel__controls .up')
        .addClass('custom-carousel__controls_disabled');
    th.find('.custom-carousel__controls .down')
        .removeClass('custom-carousel__controls_disabled');
    if(sec.length == 0) {
        th.find('.custom-carousel__controls').hide();
    }

    th.on("click", ".up", clickUp);
    th.on("click", ".down", clickDown);

    var z_time;

    function clickUp(e){
        e.preventDefault();
        th = $(this);
        var f = th.closest('.custom-carousel__controls').prev().find(".item-first");
        var s = th.closest('.custom-carousel__controls').prev().find(".item-second");
        var t = th.closest('.custom-carousel__controls').prev().find(".item-third");
        if (!i.hasClass('item-first')) {
            clearTimeout(z_time);
            f.prev()
                .css({'top': '1.4vw', 'opacity': '1', 'z-index': '4', 'width': '100%'})
                .addClass('item-first');
            f.css({'top': '0.7vw', 'left': '3%', 'width': '94%', 'z-index': '3'})
                .removeClass('item-first').addClass('item-second');
            s.css({'top': '0vw', 'left': '6%', 'width': '88%', 'z-index': '2'})
                .removeClass('item-second').addClass('item-third');
            t.css({'z-index': '1'}).removeClass('item-third');
            
            if(f.prev().prev().length == 0){
                th.addClass('custom-carousel__controls_disabled')
                    .parent().addClass('custom-carousel__controls_disabled-div');
            }

            th.closest('.custom-carousel__controls').find('img').not($(this))
                .removeClass('custom-carousel__controls_disabled')
                .parent().removeClass('custom-carousel__controls_disabled-div');
        }
        // backgroundblur();
    }

    function clickDown(e){
        e.preventDefault();
        th = $(this);
        if (!l.hasClass('item-first')) {
            var n = th.closest('.custom-carousel__controls').prev().find(".item-third").next();
            var f = th.closest('.custom-carousel__controls').prev().find(".item-first");
            var s = th.closest('.custom-carousel__controls').prev().find(".item-second");
            var t = th.closest('.custom-carousel__controls').prev().find(".item-third");
            console.log(n);
            console.log(f);
            console.log(s);
            console.log(t);
            console.log(th);
            f.css({'top': '4vw', 'opacity': '0'})
                .removeClass('item-first');
            s.css({'top': '1.4vw', 'left': '0%', 'opacity': '1', 'width': '100%'})
                .removeClass('item-second').addClass('item-first');
            t.css({'top': '0.7vw', 'left': '3%', 'width': '94%'})
                .removeClass('item-third').addClass('item-second');
            n.css({'top': '0vw', 'left': '6%', 'opacity': '1', 'width': '88%'})
                .addClass('item-third');

            if(s.next().length == 0){
                th.addClass('custom-carousel__controls_disabled')
                    .parent().addClass('custom-carousel__controls_disabled-div');
            }
            z_time = setTimeout(function(){
                f.css({'z-index': '1'});
                s.css({'z-index': '4'});
                t.css({'z-index': '3'});
                n.css({'z-index': '2'});
            },800);

            th.closest('.custom-carousel__controls').find('img').not($(this))
                .removeClass('custom-carousel__controls_disabled')
                .parent().removeClass('custom-carousel__controls_disabled-div');
        }
        // backgroundblur();
    }

    //carousel background blur
    // backgroundblur(false);
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