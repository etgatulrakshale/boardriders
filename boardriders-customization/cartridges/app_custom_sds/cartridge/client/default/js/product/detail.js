'use strict';
var base = require('./base');
var baseDetail = require('base/product/detail');

module.exports = {
    availability: base.availability,

    addToCart: base.addToCart,

    updateAttributesAndDetails: function () {
        $('body').on('product:statusUpdate', function (e, data) {
            var $productContainer = $('.product-detail[data-pid="' + data.id + '"]');

            $productContainer.find('.description-and-detail .product-attributes')
                .empty()
                .html(data.attributesHtml);

            if (data.shortDescription) {
                $productContainer.find('.description-and-detail .description')
                    .removeClass('hidden-xl-down');
                $productContainer.find('.description-and-detail .description .content')
                    .empty()
                    .html(data.shortDescription);
            } else {
                $productContainer.find('.description-and-detail .description')
                    .addClass('hidden-xl-down');
            }

            if (data.longDescription) {
                $productContainer.find('.description-and-detail .details')
                    .removeClass('hidden-xl-down');
                $productContainer.find('.description-and-detail .details .content')
                    .empty()
                    .html(data.longDescription);
            } else {
                $productContainer.find('.description-and-detail .details')
                    .addClass('hidden-xl-down');
            }
        });
    },

    updateAttribute: function () {
        $('body').on('product:afterAttributeSelect', function (e, response) {
            if ($('.product-detail>.bundle-items').length) {
                response.container.data('pid', response.data.product.id);
                response.container.find('.product-id').text(response.data.product.id);
            } else if ($('.product-set-detail').eq(0)) {
                response.container.data('pid', response.data.product.id);
                response.container.find('.product-id').text(response.data.product.id);
            } else {
                $('.product-id').text(response.data.product.id);
                $('.product-detail:not(".bundle-item")').data('pid', response.data.product.id);
            }
        });
    },
    updateAddToCart: function () {
        $('body').on('product:updateAddToCart', function (e, response) {
            // update local add to cart (for sets)
            $('button.add-to-cart', response.$productContainer).attr('disabled',
                (!response.product.readyToOrder || !response.product.available));

            var enable = $('.product-availability').toArray().every(function (item) {
                return $(item).data('available') && $(item).data('ready-to-order');
            });
            $('button.add-to-cart-global').attr('disabled', !enable);
        });
    },
    updateAvailability: function () {
        $('body').on('product:updateAvailability', function (e, response) {
            $('div.availability', response.$productContainer)
                .data('ready-to-order', response.product.readyToOrder)
                .data('available', response.product.available);

            $('.availability-msg', response.$productContainer)
                .empty().html(response.message);

            if ($('.global-availability').length) {
                var allAvailable = $('.product-availability').toArray()
                    .every(function (item) { return $(item).data('available'); });

                var allReady = $('.product-availability').toArray()
                    .every(function (item) { return $(item).data('ready-to-order'); });

                $('.global-availability')
                    .data('ready-to-order', allReady)
                    .data('available', allAvailable);

                $('.global-availability .availability-msg').empty()
                    .html(allReady ? response.message : response.resources.info_selectforstock);
            }
        });
    },
    sizeChart: function () {
        $('.size-chart a').on('click', function (e) {
            e.preventDefault();
            var url = $(this).attr('href');
            var $prodSizeChart = $(this).closest('.size-chart').find('.size-chart-collapsible');
            if ($prodSizeChart.is(':empty')) {
                $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        $prodSizeChart.append(data.content);
                    }
                });
            }
            $prodSizeChart.toggleClass('active');
        });

        var $sizeChart = $('.size-chart-collapsible');
        $('body').on('click touchstart', function (e) {
            if ($('.size-chart').has(e.target).length <= 0) {
                $sizeChart.removeClass('active');
            }
        });
    },
    copyProductLink: function () {
        $('body').on('click', '#fa-link', function () {
            event.preventDefault();
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val($('#shareUrl').val()).select();
            document.execCommand('copy');
            $temp.remove();
            $('.copy-link-message').attr('role', 'alert');
            $('.copy-link-message').removeClass('d-none');
            setTimeout(function () {
                $('.copy-link-message').addClass('d-none');
            }, 3000);
        });
    },
        initializeZoom: function (){
    	let currentZoom = null;
    	const $zoomImages = $('.zoomproduct');
    	console.log('clicked');
    	$zoomImages.each(function() {
    		const config = {
	    	    on: 'click',
	    	    url: $(this).find('img').data('hiresimg'),
	    	    onZoomIn: function() {
	    	    	if (currentZoom) {
	    	          $(currentZoom).css('display', 'none');
	    	        }
	    	        currentZoom = this;
	    	    }
    		};
    	    const isDesktop = window.innerWidth > 768;
    	    isDesktop ? $(this).zoom(config) : () => null;
    	});
    },
    
    customPDP: function(){
    	if ($(window).width() > 768) {
            $('#sidebar, #sidebar-right').stickit({
                top: 0,
                screenMinWidth: 768
            });
        }

        $(window).scroll(function() {
            var scrollDistance = $(window).scrollTop();
            // Assign active class to nav links while scolling
            $('.page-section').each(function(i) {
                if ($(this).position().top <= scrollDistance) {
                    $('.navigation a.active').removeClass('active');
                    $('.navigation a').eq(i).addClass('active');
                }
            });
        }).scroll();

        $("#learnmore").click(function() {
            $("#learndiv").dialog({
                autoOpen: true,
                modal: true,
                width: 'auto'
            });
        });
        
        //accordion on PDP
        $('body').on('click', '.drawer-label', function() {
            var $box = $(this).closest('.drawer');
            $('.drawer-label').removeClass('open');
            $box.siblings().find('.drawer-content').stop().slideUp();
            if($(this).hasClass('open')){
            	console.log("1111");
            	$(this).removeClass('open');
            }
            else {
            	console.log("2222");
            	$(this).addClass('open');
            }
            $box.find('.drawer-content').stop().slideToggle();
        });
        
        $('.pdp-image-carousel').slick({
        	dots: true,
        	arrows: false
        });
    },

    focusChooseBonusProductModal: base.focusChooseBonusProductModal()
};
