document.addEventListener('DOMContentLoaded', function() {
    function headerMenuAnimation() {
        function onMouseover() {
            this.classList.remove('header__menu-link_mouseout')
            this.classList.add('header__menu-link_mouseover')
        }

        function onMouseout() {
            this.classList.remove('header__menu-link_mouseover')
            this.classList.add('header__menu-link_mouseout')
        }

        const items = document.getElementsByClassName('header__menu-link')

        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            item.addEventListener('mouseover', onMouseover)
            item.addEventListener('mouseout', onMouseout)
        }
    }
    headerMenuAnimation()

    // function searchForm() {
    //     const search = document.querySelector('.search')
    //     const input = document.querySelector('.search__field')
    //     const clear = document.querySelector('.search__clear')

    //     if (input)
    //         input.addEventListener('input', updateValue)

    //     function updateValue(e) {
    //         if (e.target.value !== '') {
    //             search.classList.add('search_active')
    //         }
    //         else {
    //             search.classList.remove('search_active')
    //         }
    //     }

    //     if (clear) {
    //         clear.addEventListener('click', (event) => {
    //             input.value = ''
    //             search.classList.remove('search_active')
    //         })
    //     }
    // }
    // searchForm()

    function playShorts() {
        const videos = document.getElementsByClassName('shorts__item-background')

        function shortsPlay() {
            this.children[0].play()
        }

        function shortsPause() {
            this.children[0].pause()
        }

        for (let i = 0; i < videos.length; i++) {
            const video = videos[i]
            const child = video.children[0]
            
            if (child) {
                video.addEventListener('mouseover', shortsPlay)
                video.addEventListener('mouseout', shortsPause)
            }
        }
    }
    playShorts()

    function pageBackground() {
        const background = document.querySelector('.page__background')
        const body = document.querySelector('body')

        if (background) {
            body.classList.add('shifted-header')
        }
    }
    pageBackground()

    function menuActiveLink() {
        const menu = document.querySelector('.menus-buttons')

        if (menu) {
            const links = menu.querySelectorAll('a')
            const currentPath = window.location.pathname
            
            links.forEach(link => {
                if (link.pathname === currentPath)
                    link.classList.add('active')
            })
        }
    }
    menuActiveLink()
})

jQuery(document).ready(function() {
    jQuery('.filter__select').select2({
        closeOnSelect: false,
        dropdownAutoWidth: true,
    })

    jQuery('.publications-filter__select').select2({
        dropdownAutoWidth: true
    })

    jQuery('.donate__form-select, #edit-donate-to').select2({
        placeholder: 'Donate to',
        minimumResultsForSearch: -1
    })

    // jQuery('.subscription__select').select2({
    //     dropdownAutoWidth: true
    // })

    function headerAnimation() {
        var lastScrollTop = 0;
        var header = jQuery('.header')
        var headerHeight = header.height() + 16

        if (jQuery('body').hasClass('toolbar-horizontal')) {
            header.css('top', jQuery('#page').offset().top)
        }

        jQuery(window).scroll(function() {
            var scrollTop = jQuery(this).scrollTop();
            
            if (scrollTop > lastScrollTop && scrollTop > 0) {
                header.css('top', headerHeight * -1)
            } else {
                if (jQuery('body').hasClass('toolbar-horizontal')) {
                    if (lastScrollTop > 100)
                        header.css('top', jQuery('#toolbar-item-administration-tray').height())
                    else
                        header.css('top', jQuery('#page').offset().top)
                } else {
                    header.css('top', 0)
                }
                
                if (jQuery('.page').hasClass('shifted-header')) {
                    if (lastScrollTop > 50) {
                        header.addClass('header_white')
                    } else {
                        header.removeClass('header_white')
                    }
                }
            }
            
            lastScrollTop = scrollTop;
        });
    }
    headerAnimation()

    function donate() {
        jQuery('.donate__form-button').click(function() {
            jQuery('.donate__form-button').removeClass('active')
            jQuery(this).addClass('active')
        })
    }
    donate()

    function carousel() {
        jQuery('.events:not(.events_banner):not(.events_banner-small)').flickity({
            fade: true,
            pageDots: false,
            wrapAround: true
        })

        if (jQuery(window).width() > 767) {
            jQuery('.page__info-carousel').flickity({
                cellAlign: 'left',
                pageDots: false,
                prevNextButtons: false
            })
        }
    }
    carousel()

    function tabs() {
        jQuery('.tab-controls__button').click(function() {
            var target = jQuery(this).attr('data-target')
            var type = jQuery(this).attr('data-type')

            jQuery('.tab-controls__button[data-type="'+type+'"]').removeClass('active')
            jQuery(this).addClass('active')
            
            jQuery('.tab-content[data-type="'+type+'"]').removeClass('active')
            jQuery('.tab-content[data-target="'+target+'"][data-type="'+type+'"]').addClass('active')

            return false
        })

        jQuery('.tab-controls:not(.report-tabs)').each(function() {
            var tab = jQuery(this).children(':first')
            var target = tab.attr('data-target')

            tab.addClass('active')
            jQuery('.tab-content[data-target="'+target+'"]').addClass('active')
        })
    }
    tabs()

    function hashTab() {
        const hash = window.location.hash;
        if (!hash) return;

        const hashVal = hash.substring(1);
        const target = jQuery(`.tab-controls__button[data-target="${hashVal}"]`)
        const targetTab = jQuery(`.tab-content[data-target="${hashVal}"]`)
        const type = target.attr('data-type')
        const tabs = jQuery(`.tab-controls__button[data-type="${type}"]`);
        const tabsContent = jQuery(`.tab-content[data-type="${type}"]`)

        tabs.removeClass('active');
        tabsContent.removeClass('active');

        target.addClass('active');
        targetTab.addClass('active');
    }
    hashTab()

    function statementsToggle() {
        jQuery('.statements__toggler').click(function() {
            jQuery('.statements__accordion').toggleClass('active')
            jQuery(this).toggleClass('active')
        })
    }
    statementsToggle()

    function navigation() {
        jQuery('.navigation:not(.navigation_knowledge)').each(function() {
            var child = jQuery(this).find('.navigation__item')
            
            if (child.length == 1)
                child.css('width', '100%')
            else if (child.length == 2)
                child.css('width', '50%')
            else if (child.length == 4) {
                if (jQuery(window).width() >= 992)
                    child.css('width', '25%')
                else if (jQuery(window).width() < 768)
                    child.css('width', '100%')
                else
                    child.css('width', '50%')
            }
            else if (child.length == 5) {
                child.css('width', '33.3333333333%')
                child.last().css('width', '50%')
                child.last().prev().css('width', '50%')
            }
            else if (child.length == 6) {
                child.css('width', '33.3333333333%')
            }
            else if (child.length > 6 && child.length < 9) {
                child.css('width', '33.3333333333%')
                if (child.length % 2 !== 0) {
                    child.first().css('width', '50%')
                    child.first().next().css('width', '50%')
                    child.last().css('width', '50%')
                    child.last().prev().css('width', '50%')
                }
                else
                    child.css('width', '25%')
            }
            else if (child.length == 9) {
                child.css('width', '33.3333333333%')
            }
            else if (child.length >= 10) {
                jQuery('.navigation').css('display', 'block')
                jQuery('.navigation').flickity({
                    cellAlign: 'left',
                    pageDots: false,
                })
            }
        })
    }
    navigation()

    function headerModal() {
        jQuery('.header__search, .search-modal .close').click(function() {
            jQuery('.search-modal').toggleClass('active')
            jQuery('body').toggleClass('overlay')
            jQuery('.search__input').val('')

            return false
        })

        jQuery('.search__input').on('input', function() {
            var fieldValue = jQuery(this).val().length

            if (fieldValue > 0)
                jQuery('.search__result').show()
            else
                jQuery('.search__result').hide()
        })

        jQuery(document).mouseup(function(e) {
            var container = jQuery('.search-modal')
    
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if (jQuery('.search-modal').hasClass('active')) {
                    jQuery('.search__input').val('')
                }
    
                container.removeClass('active')
                jQuery('body').removeClass('overlay')
            }
        });
    }
    headerModal()
    
    jQuery('.services').masonry({
        gutter: 32
    })

    function langToggle() {
        const langAttr = jQuery('html').attr('lang')
        const currentLang = jQuery('.lang-toggle li > *:contains('+langAttr+')')
        const currentLangClone = currentLang.parent().clone()
        const langList = jQuery('.lang-toggle')

        currentLang.parent().remove()

        const langListContent = langList.html()

        langList.html('')
        langList.prepend(currentLangClone)
        langList.append('<ul class="lang-toggle__list">'+langListContent+'</ul>')

        const chinese = 'zh-hans'
        const newChinese = 'Cn'
        jQuery('.lang-toggle li > *:contains('+chinese+')').text(newChinese)
    }
    langToggle()

    jQuery(window).on('hashchange', hashTab)
})

jQuery(window).on('load', function() {
    if (jQuery('.accordion').length) {
        jQuery('.accordion').accordion({
            heightStyle: "content"
        })
    }
    
    jQuery('.meetings__items').flickity({
        pageDots: false,
        prevNextButtons: false,
        cellAlign: 'left',
    })

    jQuery('.campaigns').flickity({
        pageDots: false,
        wrapAround: true
    })

    jQuery('.recommendation__items, .impact__carousel').flickity({
        pageDots: false,
        cellAlign: 'left',
    })

    jQuery('.quote-carousel, .cards__carousel').flickity({
        pageDots: false,
        cellAlign: 'left',
        wrapAround: true,
    })

    jQuery('.regions__carousel').flickity({
        pageDots: false,
        cellAlign: 'left',
    })

    jQuery('.areas__carousel').flickity({
        pageDots: false,
        cellAlign: 'left',
        asNavFor: '.areas__carousel-text'
    })

    jQuery('.areas__carousel-text').flickity({
        pageDots: false,
        prevNextButtons: false,
    })
})