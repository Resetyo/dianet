$(document).ready(function(){
    //submit address check
    $('.content__address-check form').submit(function(e){
        $.ajax({
            type: "POST",
            url: '',
            data: $(this).serialize(),
            success: function(data) {
                addressCheckSubmitActions(true);
            },
            error: function(data) {
                addressCheckSubmitActions(true); //only for demonstration, switch to false
            }
        });
        e.preventDefault();
    });

    //modal complete
    $(".modal form").submit(function(e){
        $.ajax({
            type: "POST",
            url: '',
            data: $(this).serialize(),
            success: function(data) {
                $(".modal-complete").show();
            },
            error: function(data) {
                $(".modal-complete").show(); //only for demonstration, remove it
            }
        });
        $('.modal form').hide();
        setTimeout(function(){
            $('.modal').modal('hide');
        }, 2000);
        e.preventDefault();
    });

    //modal order
    $('.content__order form').submit(function(e){
        e.preventDefault();
        var $matched_address = false;
        $.ajax({
            type: "POST",
            url: '',
            data: $(this).serialize(),
            success: function(data) {
                $(this).submit();
            },
            error: function(data) {
                $('#orderModal').modal('show');
            }
        });
    });

    //change address button
    $('#orderModal').on('show.bs.modal', function(){
        $(this).find('.modal-footer button').click(function(e){
            e.preventDefault();
            $('#orderModal').modal('hide');
            $(window).scrollTop(0);
            $('#street').focus();
        });
    });

    //modals blur background
    $('.modal').on('show.bs.modal', function(){
        $(".wrapper").css({'filter': 'blur(4px)'});
    });
    $('.modal').on('hide.bs.modal', function(){
        $(".wrapper").css({'filter': 'blur(0px)'});
    });

    //sign in
    $(".main-menu__signin").click(function(e) {
        e.preventDefault();
        $(".sign-in-shade").css({'display': 'flex'});
        $(".wrapper").css({'filter': 'blur(4px)'});
        
        //card number mask
        $("#card_number").mask('0000 0000 0000 0000');
    });
    $(".sign-in-shade .close").click(function(){
        $(".sign-in-shade").hide();
        $(".wrapper").css({'filter': 'none'});
    });

    //nav-menu animation
    $('.nav-menu').on("click", "a", function(e) {
        // e.preventDefault();
        var l = $(this);
        var a = l.siblings(".active");
        $("header .separator").css({
                'position': 'absolute',
                'z-index': '2',
                'background-color': '#f99531',
                'width': a.width() + 28,
                'height': '3px',
                'bottom': '0',
                'left': a.offset()['left'] + 14,
                'display': 'initial'
            }).prependTo(a.parent()).animate({
                width: l.width() + 28,
                left: l.offset()['left']
            }, 250, function() {
                a.css({'margin-bottom': '0'});
                l.addClass("active");
                $(this).hide();
            });
        a.css({'margin-bottom': '3px'});
        a.removeClass("active");
    });

    //stock time left
    var now = Date.now();
    var monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    var cd = 24 * 60 * 60 * 1000;
    var fields = $('.main-home-carousel__stock__left');
    $.each(fields, function(i,field) {
        till = new Date(Date.parse($(field).data('till')));
        var day = till.getDate();
        var monthIndex = till.getMonth();

        var left = Math.round( (till - now ) / cd );
        if (left < 0) {left = 0;}

        var days;
        switch (left % 10) {
          case 1:
            days = 'день'; break;
          case 2: case 3: case 4:
            days = 'дня'; break;
          default:
            days = 'дней';
        }
        if(left > 10 && left < 20) {days = 'дней';}

        $(field).html(left + ' ' + days + ' (' + day + ' ' + monthNames[monthIndex] + ')');
    });


    //block with plus
    $('.content__unfolding__plus').on("click", function(e) {
        var t = $(this);
        if(t.hasClass('open')) {
            t.removeClass('open').css({'transform': 'rotate(0deg)'});
            t.parent().next("p").slideUp('100');
        } else {
            t.addClass('open').css({'transform': 'rotate(45deg)'});
            t.parent().next("p").slideDown('100');
        }
    });

    //label animation
    $(".live-labels input").val('');
    $('.live-labels').on("focus", "input", function(e) {
        if( !$(this).hasClass('moved-label') ){
            $(this).prev().addClass('moved-label');
        }
        if($(this).attr('id') == 'phone') {
            $("#phone").attr('placeholder', "_ (___)___-__-__");
        }
    });
    $('.live-labels').on("blur", "input", function(e) {
        if( $(this).val() == '' ) {
            $(this).prev().removeClass('moved-label');
        }
        if($(this).attr('id') == 'phone') {
            $("#phone").attr('placeholder', "");
        }
    });

    //address-ckeck custom city select
    custom_select();

    //tariff info button
    $(document).mouseup(function (e) {
        var button = $(e.target);
        var all_buttons = $('.content__tariffs__item__info');
        var desc_all = $('.content__tariffs__item__description div');
        if (button.hasClass('content__tariffs__item__info')){
            var id = button.data('id');
            var wrapper = button.closest('.content__tariffs__item');
            var desc = wrapper.find('.content__tariffs__item__description-' + id);
            var invisible = desc.offset()['left'] < 0;
            if (invisible) {
                desc_all.css({'left': '-700px'});
                all_buttons.removeClass('content__tariffs__item__info_open');
                button.removeClass('content__tariffs__item__info_open');
                var top = button.offset()['top'] - wrapper.offset()['top'] - desc.outerHeight() / 2.5;
                var left = button.offset()['left'] + 20;
                var max_left = wrapper.outerWidth() - desc.outerWidth();
                if (left > max_left) {
                    left = max_left;
                    top = top - desc.outerHeight() * 0.6 - 8;
                }
                desc.css({'left': left+'px', 'top': top+'px'});
                button.addClass('content__tariffs__item__info_open');
            } else {
                desc_all.css({'left': '-700px'});
                all_buttons.removeClass('content__tariffs__item__info_open');
            }
        } else {
            desc_all.css({'left': '-700px'});
            all_buttons.removeClass('content__tariffs__item__info_open');
        }
    });

    //tariff checkboxes price change
    $(".content__tariffs__item [type=checkbox]").each(function(){
        if($(this).attr('checked') != 'checked') {
            this.checked = false;
        }
    });
    $(".content__tariffs__item").on('change', ':checkbox', function(){
        var price_field = $(this).closest('form').find('.content__tariffs__item__price');
        var price = parseInt(price_field.text());
        if(this.checked) {
            price += parseInt($(this).data('price'));
        } else {
            price -= parseInt($(this).data('price'));
        }

        price_field.text(price);
    });

    //tariff background blur
    $('.content__tariffs__item').mouseover(function(){
        $(this).find('.content__tariffs__item__background').css({'filter': 'blur(3px)'});
    });
    $('.content__tariffs__item').mouseout(function(){
        $(this).find('.content__tariffs__item__background').css({'filter': 'blur(0px)'});
    });

    //shade when address check form clicking
    $(document).mouseup(function (e) {
        var container = $('.content__address-check form');
        if (container.has(e.target).length === 0){
            $(".content__address-check__shade").removeClass('content__address-check__shaded');
            $(".content__address-check__shade_inner").removeClass('content__address-check__shaded_inner');
            $('.nav-menu').css({'z-index':'11'});
        } else {
            $(".content__address-check__shade").addClass('content__address-check__shaded');
            $(".content__address-check__shade_inner").addClass('content__address-check__shaded_inner');
            $('.nav-menu').css({'z-index':'1'});
        }
    });

    //reviews pagination
    var list = $('.content__table').find('.reviews-carousel');
    if(list.length > 10){
        list.slice(10).hide();
        var more_button = $('.content__reviews__more');
        var i = 0;
        more_button.css({'display': 'inline-block'}).click(function(){
            i++;
            list.slice(10*i, 10*(i+1)).show();
            if(list.length <= 10*(i+1)){
                more_button.hide();
            }
            if(list.length <= 10*(i+2)){
                $('.content__reviews__more-count').text(list.length - 10*(i+1));
            }
        });
    }

    //modal autocomplete
    $('#contactModal').on('show.bs.modal', function(e){
        $('input').each(function(){
            var text = $(this).val();
            var name = $(this).attr('name');
            $(this).after(this.outerHTML).remove();
            $('input[name=' + name + ']').val(text);
        });
        //phone mask
        $("#phone").mask('0 (000) 000-0000');
    });
});


//media queries

if (matchMedia) {
  var mq = window.matchMedia("(min-width: 1024px)");
  var mq1 = window.matchMedia("(min-width: 768px)");
  WidthChange(mq);
  WidthChange1(mq1);
  mq.addListener(WidthChange);
  mq1.addListener(WidthChange1);
}

function WidthChange1(mql) {
    // if (mq1.matches) {
        // console.log('768');
    // } else {
        // console.log('767');
    // }
}
 
function WidthChange(mql) {
    var mhicarousel = $(".mobile-main-home-carousel");
    var mlcarousel = $(".mobile-license-carousel");
    var mrcarousel = $(".mobile-reviews-carousel");
    var rb = $('.content__right-block');

    if (mq.matches) {
    //animation
    var target = $('.content__animation');
    if (target.length > 0) {
        var targetPos = target.offset().top+400;
        var winHeight = $(window).height();
        var scrollToElem = targetPos - winHeight;
        $(window).scroll(function(){
          var winScrollTop = $(this).scrollTop();
          if(winScrollTop > scrollToElem){
            setTimeout(function() { 
                $('.content__animation__1-1').css({'transform': 'translateX(210px)'});
                $('.content__animation__1-2').css({'opacity': '0'});
                $('.content__animation__2-1').css({'transform': 'translateX(-140px)'});
                $('.content__animation__2-2').css({'opacity': '0'});
                $('.content__animation__1-1').css({'opacity': '0'});
                $('.content__animation__2-1').css({'opacity': '0'});
                $('.content__animation img').css({'width': '181px'});
                $('.content__animation img').css({'height': '181px'});
                $('.content__animation img').css({'opacity': '1'});
            }, 1000);
          }
        });
    }

    //nav menu & right block scroll
    var h_nav = $('.nav-menu').outerHeight();
    $(window).scroll(function() {
        var top = $(this).scrollTop();
        var mm = $('.main-menu');
        var nm = $('.nav-menu');
        var h_total = mm.outerHeight() + mm.offset()['top'];

        if (top >= h_total && !nm.hasClass('fxd')) {
            nm.addClass('fxd');
        } else if(top < h_total && nm.hasClass('fxd') ){
            nm.removeClass('fxd');
        }

        if(rb.length > 0) {
            var footer = $('footer').outerHeight();
            var doc_total = $('.content').outerHeight() - rb.outerHeight();
            var lb = $('.content__left-block');
            var pos = lb.offset()['top'];
            var bh_total = lb.offset()['top'] - nm.outerHeight() - 10;
            if (top >= bh_total && 
                !rb.hasClass('content__right-block_fixed') &&
                 lb.outerHeight() > rb.outerHeight() ) {
                rb.addClass('content__right-block_fixed').css({'top':nm.outerHeight() +10});
            } else if(top < bh_total && rb.hasClass('content__right-block_fixed') ){
                rb.removeClass('content__right-block_fixed').css({'top': 0 });

            }
            if(top > doc_total && lb.outerHeight() > rb.outerHeight() ) {
                rb.removeClass('content__right-block_fixed').css({'top': doc_total - pos + nm.outerHeight() + 10});
            }
        }
    });

    //carousels initialization
    $(".license-carousel").show();
    mlcarousel.hide();
    $(".license-carousel").customCarousel();

    $(".reviews-carousel").show();
    mrcarousel.hide();
    $(".reviews-carousel").customCarousel();

    $(".main-home-carousel").show();
    mhicarousel.hide();
    var mhcarousel = $(".main-home-carousel");
    mhcarousel.unbind();
    mhcarousel.customCarousel();

    //carousel arrows
    if(mhcarousel.length > 0) {
        var mhcarousel_ctrl = mhcarousel.find('.custom-carousel__controls > div');
        mhcarousel_ctrl.mouseover(function(e){
            if(!$(this).find('img').hasClass('custom-carousel__controls_disabled')){
                $(this).addClass('custom-carousel__controls_active');
            }
        });
        mhcarousel_ctrl.mouseout(function(e){
            $(this).removeClass('custom-carousel__controls_active');
        });
    }

    //bricket button animation
    $('.content__brickets').on("mouseover", ".content__brickets__block", function(e) {
        $(this).find("a").last()
            .css({'bottom': '2vw', 'opacity': '1'});
    });
    $('.content__brickets').on("mouseout", ".content__brickets__block", function(e) {
        $(this).find("a").last()
            .css({'bottom': '-2vw', 'opacity': '0'});
    });
    $('.content__brickets__block__buttons a').css({'bottom': '-2vw', 'opacity': '0'});;
    $('.content__brickets__block__button_1').css({'bottom': '2vw', 'opacity': '1'});;

    //gray bricket partner read more animation
    $('.content__gray-brickets__partner').mouseover(function(){
        $(this).find('.content__gray-brickets__partner__bw-label').css({'opacity': '0'});
        var read_more = $(this).find('.content__gray-brickets__partner__read-more');
        if(read_more.length > 0){
            read_more.css({'opacity': '1'});
        }
    });
    $('.content__gray-brickets__partner').mouseout(function(){
        $(this).find('.content__gray-brickets__partner__bw-label').css({'opacity': '1'});
        var read_more = $(this).find('.content__gray-brickets__partner__read-more');
        if(read_more.length > 0){
            read_more.css({'opacity': '0'});
        }
    });

    //move order tariff from submit to the right block
    $(".content__order__tariff").parent()
        .insertAfter(".content__order > h3 + div")
        .css({'margin-top': '0', 'width': '33.33333333%'});

    //move unfolding to the left block
    var unfolding = $('.content__unfolding');
    var unfolding_header = unfolding.prev('h3');
    // unfolding = unfolding_header.add(unfolding);
    unfolding_header.insertAfter('.content__left-block > div:last-child');
    unfolding.insertAfter(unfolding_header);

  } else {
    $('.content__gray-brickets__partner').off('mouseover').off('mouseout');
    $('.content__brickets').off('mouseover').off('mouseout');
    $('.content__brickets__block__div a').css({'bottom': '0', 'opacity': '1'});;
    $(window).off('scroll');
    $(window).scroll(function() {
        rb.removeClass('content__right-block_fixed').css({'top':0});
    });


    //owl carousels initialization for mobile
    if(mhicarousel.length > 0) { 
        mhicarousel.show();
        mhicarousel.owlCarousel({items:1,margin:30}); 
    }
    $(".main-home-carousel").removeClass('custom-carousel').hide();

    if(mlcarousel.length > 0) { 
        mlcarousel.show();
        mlcarousel.owlCarousel({items:1,margin:30}); 
    }
    $(".license-carousel").removeClass('custom-carousel').hide();

    if(mrcarousel.length > 0) { 
        mrcarousel.show();
        mrcarousel.owlCarousel({items:1,margin:30}); 
    }
    $(".reviews-carousel").removeClass('custom-carousel').hide();

    //move order tariff before submit
    $(".content__order__tariff").parent()
        .insertBefore(".content__order__form__submit")
        .css({'margin-top': '30px', 'display': 'inline-block', 'width': '100%'});

    //move unfolding up to advantages
    var unfolding = $('.content__unfolding');
    var unfolding_header = unfolding.prev('h3');
    unfolding_header.insertAfter('.content__right-block .row');
    unfolding.insertAfter(unfolding_header);
  }
}

function addressCheckSubmitActions(status = false) {
    if(
        status == true
        && $('h1').text() != 'качественное tv для дома' //remove it, just for demonstration
        ) {
        message = $('.content__address-check__success');
        $('.content__light-shadow').hide();
    } else {
        message = $('.content__address-check__missing');
    }
    message.show();
    $(window).scrollTop(0);
    $('.content__address-check > h2').hide();
    $('.content__address-check > form').hide();
    $('.content__address-check__shade').removeClass('content__address-check__shaded');
    message.find('.content__address-check__round').css({'width': '100%', 'height': '100%'});
    message.find('.content__address-check__sign-wrapper').css({'width': '100%'});
    message.find('.content__address-check__complete-text').css({'padding': '0 0 0 2vw'});
    $('.nav-menu').css({'z-index':'11'});
}

function custom_select() {
    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
        var label = $this.prev();
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        if($this.hasClass('with-gray-arrow')){
            $this.after('<div class="select-styled"><div></div><img src="assets/images/dropdown.svg"></div>');
        } else {
            $this.after('<div class="select-styled"><div></div><img src="assets/images/select_arrow.svg"></div>');
        }

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.children('div').text($this.children('option').eq(0).text());
      
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
      
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var empty = $list.children("li:first");
        if(empty.text() == "") {
            $list.children("li:first").remove();
        }

        if($styledSelect.children('div').text() != "") {
            label.addClass('moved-label');
        }
      
        var $listItems = $list.children('li');
        var $label = $styledSelect.parent().prev();
        var $other_labels = $this.closest('form').find('label').not($label);
      
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
                $(this).parent().prev().removeClass('moved-label');
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
            hideLabelsOnSelectActive();
        });
      
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.children('div').text($(this).text()).parent().removeClass('active');
            $label.addClass('moved-label');
            $this.val($(this).attr('rel'));
            $list.hide();
            hideLabelsOnSelectActive();
            if($this.hasClass('with-gray-arrow')){
                $("#link-dropdown"+$(this).attr('rel')).tab('show');
            }
            
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
            hideLabelsOnSelectActive();
        });


        function hideLabelsOnSelectActive() {
            if($styledSelect.hasClass('active') && !mq1.matches){
                $other_labels.parent().css({'opacity': '0'});
            } else {
                $other_labels.parent().css({'opacity': '1'});
            }
        }
    });
    
}