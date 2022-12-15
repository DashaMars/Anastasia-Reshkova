document.addEventListener("DOMContentLoaded", () => {  /*после загрузки html загрузка js*/

    let mobileMenu = function () { /*Объявление функции для меню бургера*/
        const body = document.querySelector('body'), /*поиск в html элемента body*/
              mobileMenu = document.querySelector('#mobile-menu-js'),
              mobileHamburger = document.querySelector('#mobile-hamburger-js'),
              mobileCloseMenu = document.querySelectorAll('.mobile-menu-box a'); /*all для нескольких элементов*/

        mobileHamburger.addEventListener('click', ()=>{ /*событие при клике*/
            mobileMenu.classList.toggle('_is-active');
            mobileHamburger.classList.toggle('_is-active');
            body.classList.toggle('_scroll-hiddin');
        });

        mobileCloseMenu.forEach((item) =>{ /*цикл для множества элементов списка*/
            item.addEventListener("click", hiddenMenu);
        });

        function hiddenMenu(){
            body.classList.remove('_scroll-hiddin'); /*при нажатии пункта меню удаляем элементы бургера*/
            mobileMenu.classList.remove('_is-active');
            mobileHamburger.classList.remove('_is-active');

        }
    }

    let tab = function () {  /*Объявление функции для табов*/
        let tabNav = document.querySelectorAll(".tabs-work"),
            tabContent = document.querySelectorAll(".tab"),
            tabName;

        tabNav.forEach((item) => {
            item.addEventListener("click", selectTabNav);
        });

        function selectTabNav() {
            tabNav.forEach((item) => { /*удаляем у всех*/
                item.classList.remove("_is-active");
            });

            this.classList.add("_is-active"); /*добавляем именно тому, на который кликнули*/
            tabName = this.getAttribute("data-tab-name"); /*передаем значение атрибута имени*/
            selectTabContent(tabName);
        }

        function selectTabContent(tabName) {
            tabContent.forEach((item) => {
            item.classList.contains(tabName) /*сравниваем с именем таба*/
                ? item.classList.add("_is-active") /*при наличии активируем*/
                : item.classList.remove("_is-active"); /*где не совпадает - удаляем*/
            });
        }
    }

    let slider = function(){ /*Объявление функции для слайдера(из документации к библиотеке)*/
        const swiper = new Swiper('#review-slider-js', {
            
            calculateHeight:true,
            loop: true,  /* слайдер был бесконечный */
    
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
    
            navigation: {
              nextEl: '.slider-arrow-prev',
              prevEl: '.slider-arrow-next',
            },
    
            breakpoints: {
                320: { /*количество слайдов и расстояние между ними с 320px*/
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                1300: {  /*количество слайдов и расстояние между ними с 1300px*/
                    slidesPerView: 2,
                    spaceBetween: 50,
                },
              },
    
            keyboard: true, /*проматывание пальцем*/
        });
    }

    let imagePopup = function(elem){
        const imagesContainer = document.querySelectorAll(elem);

        imagesContainer.forEach(function (item){
            item.addEventListener('click', function (e) {
                if (!e.target.matches('img')) return;
                else{
                    let image = e.target;

                    let popupImage = document.createElement("img");
                    popupImage.setAttribute('src', image.src);
                    popupImage.style.width = image.width+"px";
                    popupImage.style.height = image.height+"px";
                    popupImage.style.left = image.offsetLeft+"px";
                    popupImage.style.top = image.offsetTop+"px";
                    popupImage.classList.add('popImage');

                    let popupContainer = document.createElement("div");
                    popupContainer.classList.add('popupContainer');

                    let popUpBackground = document.createElement("div");
                    popUpBackground.classList.add('popUpBackground');

                    let popUpBackgroundInner = popupContainer.appendChild(popUpBackground);
                    popUpBackgroundInner.appendChild(popupImage);
                    document.body.appendChild(popupContainer);

                    popupImageFunction();


                    let wait;
                    window.onresize = function(){
                        clearTimeout(wait);
                        wait = setTimeout(popupImageFunction, 100);
                    };

                    popupImage.addEventListener('click', function (e) {
                        closePopUpImage();
                    });
                    popUpBackground.addEventListener('click', function (e) {
                        closePopUpImage();
                    });


                    function popupImageFunction(){
                        popUpBackground.classList.add('active');
                        document.querySelector('body').classList.add('_scroll-hiddin');
                        popupImage.style.left = "10%";
                        popupImage.style.top = "100px";
                        popupImage.style.width = window.innerWidth * 0.7+"px";
                        popupImage.style.height = '100%';
                    }

                    function closePopUpImage(){
                        popupImage.style.width = image.width+"px";
                        popupImage.style.height = image.height+"px";
                        popupImage.style.left = image.offsetLeft+"px";
                        popupImage.style.top = image.offsetTop+"px";
                        document.querySelector('body').classList.remove('_scroll-hiddin');
                        popUpBackground.classList.remove('active');
                        popupContainer.remove();
                    }

                }
            });
        });
    }

    
    mobileMenu(); /*Вызов функций*/
    tab();
    slider();

    const mediaQuery = window.matchMedia('(min-width: 450px)')
    if (mediaQuery.matches) {
        imagePopup(".portfolio")
    }

});