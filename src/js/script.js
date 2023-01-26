//метод, который запускает slick-slide
$(document).ready(function(){
    $('.carousel__inner').slick({ 
        speed: 1200,
        // adaptiveHeight: true, //отключает опцию контроля высоты картинок 
        prevArrow:'<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="../icons/right.png"></button>'
      });  

      

    


    //   смена контента (в блоке content) при нажатии табов (tab) 
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      //смена контента в item  по переходу ссылок
      function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // modal
      $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
      });
      
      //change subtitle in modal
      $('.button_mini').each(function(i){
        $(this).on('click', function(){
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });


      //validate forms
       
      function valideForms(form){
        $(form).validate({
          rules: {
            name: {
              required: true
            },
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
      
          messages: {
            name: {
              required: "Пожалуйства, введите свое имя"
            },
            phone:"Пожалуйства, введите свой номер телефона",
            email: {
              required: "Пожалуйства, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }
      
        });
      };
      
      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');

      //maskedinputphone

      $('input[name=phone]').mask('+7 (999) 999-99-99'); //в разметке обязательно у input  удалить "type=number"

       //отправка сообщения на сервер
      $('form').submit(function(e){
        e.preventDefault(); //отключить дефолтные настройки браузера (в данном случае перезагрузку страницы при отправке форм)
        $.ajax({
          type: "POST", // 'отправить'
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function(){   // 'done(function(){...})' - выполни следующее после отправки формы (иначе говря: "реакция в форме , после отправки запроса")
          $(this).find("input").val("");  // "после отправки формы у всех импутов удалить value(содержимое полей)"
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset');  // "все формы должны очиститься"
        }); 
        return false;
      });

      //Smooth scroll and pageup

      $(window).scroll(function(){
        if ($(this).scrollTop()>1600){
          $('.pageup').fadeIn();
        } else{
          $('.pageup').fadeOut();
        }
      });

      // script smooth scroll
      $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      });

      // include animations script (wOW.min.js)
      new WOW().init(); // подключая js скрипты c анимацией , необходимо убрать классы "animate__animated" и "animate__fadeInUp"

});    



//второй способ создания и настройски слайдера 
// let slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls:false,
//     nav:false
//   });

//   document.querySelector('.prev').addEventListener('click', function() {
//     slider.goTo('prev');
//   });

//   document.querySelector('.next').addEventListener('click', function() {
//     slider.goTo('next');
//   });