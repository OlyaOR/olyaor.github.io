$(document).ready(function(){
    $('.carousel__inner').slick({ // настройка карусели (смены картинок)
        speed: 1200, //скорость смены картинки
        adaptiveHeight: true, // изменение высоты под картинку
        prevArrow: '<button type="button" class="slick-prev"> <img src="img/watch/chevron_left_solid_980.png"> </button>', //добавляем стрелки
        nextArrow: '<button type="button" class="slick-next"> <img src="img/watch/chevron_right_solid_982.png"> </button>',
        responsive: [
            { 
                breakpoint: 991, // правило работает от 0 до 991 масштаб
                settings: {
                    dots: true, // добавляем точки
                    arrows: false,// стрелки убираем
                }
            },
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { // изменение активности у классов на табах
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) { // изменение активности у каталога, при нажании на сстылки подробнее и назад
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault(); // сброс настоект браузера
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__info').eq(i).toggleClass('catalog-item__info_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__link-back');

    // modal 

    $('[data-modal="consultation"]').on('click', function (){
        $('.overlay, #consultation').fadeIn("slow"); //открытие модального окна
    });
    $('.modal__close').on('click', function (){ //закрытие модального окна
        $('.overlay, #consultation, #thanks, #order').fadeOut("slow");
    });
    $('.button_catalog__btn').each(function(i) { // изменение текста в модальном окне на текст в зависимости от выбранного товара
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn("slow");
        });
    });

    function validatForms(form){ // валидация форм/ проверка правильности заполнения форм
        $(form).validate({
            rules: {
                name: 'required', // имя обязательно
                phone: 'required', // телефон тоде
                email: {
                    required: true, // почта обязательно
                    email: true // проверка на почту (действительно ли введен почтовый адрес)
                }
            },
            messages: { // сообщения если введены не верные данные согласно правилам
                name: "Пожалуйста, введите свое имя",
                phone: 'Пожалуйста, введите свой номер телефона',
                email: {
                  required: "Пожалуйста, введите свой почтовый адрес",
                  email: "Неправильно введен почтовый адрес"
                }
            }
        });
    }

    validatForms ('#consultation-form');
    validatForms ('#consultation form');
    validatForms ('#order form');

    $('input[name=phone]').mask('+375 (99) 999-99-99'); // маска для ввода номера телефона


    $('form').submit(function(e) { // отправка форм
        e.preventDefault();
        $.ajax({
            type: 'POST', // отправка данных
            url: 'mailer/smart.php', // куда отправляем, бэкэнд
            data: $(this).serialize() // данные
        }).done(function() { // после отправки
            $(this).find('input').val(''); // отчистка форм
            $('#consultation, #order').fadeOut();  // закрытие форм
            $('.overlay, #thanks').fadeIn('slow'); // открыть благодарность

            $('form').trigger('reset'); 
        });
        return false;
    });
    // scroll 
    $(window).scroll(function() { // скрол работает как ссылка(сразу перемещает пользователя на первую секцию)
        if ($(this).scrollTop() > 1000) { // скрол появляется только после того как прокрулили 1000px вниз, дисплей none у скролла в начале
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href=#promo]").click(function(){ //плавный скрол к элементам
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    $("a[href=#catalog]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init(); // для работы анимации, запускает ее при скроллинге на нужную секцию (class="wow" для тега с анимацией)

});