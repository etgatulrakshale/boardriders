'use strict';
var base = require('base/product/base');
var baseDetail = require('base/product/detail');

module.exports = {
    availability: base.availability,
    addToCart: base.addToCart,
    updateAttributesAndDetails: baseDetail.updateAttributesAndDetails,
    
    showSpinner: baseDetail.showSpinner,
    updateAttribute: baseDetail.updateAttribute,
    updateAddToCart: baseDetail.updateAddToCart,
    updateAvailability: baseDetail.updateAvailability,
    sizeChart: baseDetail.sizeChart,
    copyProductLink: baseDetail.copyProductLink,
    
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
            $(this).addClass('open');
            $box.find('.drawer-content').stop().slideToggle();
        });
    },

    focusChooseBonusProductModal: base.focusChooseBonusProductModal()
};
