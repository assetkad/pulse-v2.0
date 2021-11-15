$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrowLeft.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrowRight.png"></button>',
        autoplay: true,
        autoplaySpeed: 2000,
        //variableWidth: true,
        responsive: [{
            breakpoint: 575,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            }
        }
        ]
    });

    // $(window).on('resize', function() {
    //     if($(this).width() < 576) {
    //         $('.carousel').style.display = 'none';

    //         return;
    //     }
    // });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container')
            .find('div.catalog__items')
            .removeClass('catalog__items_active')
            .eq($(this).index())
            .addClass('catalog__items_active');
    });

    function toggleSlide(linkName) {
        $(linkName).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog__main').eq(i).toggleClass('catalog__main_active');
                $('.catalog__back').eq(i).toggleClass('catalog__back_active');
            });
        });
    }

    toggleSlide('.catalog__link');
    toggleSlide('.catalog__backlink');

    // Modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_buy').on('click', function () {
        $('.overlay, #order').fadeIn('slow');
    });

    $('.button_buy').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__subheader')
                .text($('.catalog__title')
                    .eq(i).text());
        });
    });

    function validate(formId) {
        $(formId).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 15
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Введите ваше имя",
                phone: "Введите номер телефона",
                email: {
                    required: "Введите почту",
                    email: "Введите корректную почту"
                }
            }
        });
    }

    validate('#form-consultation');
    validate('#form-order');
    validate('.consultation form');


    $('[name="phone"]').mask("+7 (999) 999-99-99");


    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#order, #consultation').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    // page up
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // smooth scrolling
    $("a[href!='#']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });

    new WOW().init();
});