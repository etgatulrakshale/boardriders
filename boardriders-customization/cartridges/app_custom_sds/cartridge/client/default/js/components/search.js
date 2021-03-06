'use strict';
var baseSearch = require('base/components/search');

module.exports = {
	isMobileSearch: baseSearch.isMobileSearch,
	clearModals: baseSearch.clearModals,
	applyModals: baseSearch.applyModals,
	tearDownSuggestions: baseSearch.tearDownSuggestions,
	toggleSuggestionsIcon: baseSearch.toggleSuggestionsIcon,
	handleMoreContentBelowIcon: baseSearch.handleMoreContentBelowIcon,
	positionSuggestions: baseSearch.positionSuggestions,
	processResponse: baseSearch.processResponse,
	getSuggestions: baseSearch.getSuggestions,
	handleArrow: baseSearch.handleArrow,
    methods: {

    },
    boot: function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 60) {
                $(".global-header").addClass('sticky-header');
            } else {
                $(".global-header").removeClass('sticky-header');
            }
        });
        $('.header--mobile-naviation .top-level-link').click(function (e) {
		  e.preventDefault();
		  $(".top-level-link").closest("li").find(".level-2-menu").slideUp("fast");
		  if ($(this).closest("li").hasClass("active")) {
		    $(this).closest("li").removeClass('active');
		  } else {
		  $(".top-level-link").closest("li").removeClass('active');
		    $(this).closest("li").find(".level-2-menu").slideDown();
		    $(this).closest("li").addClass('active');
		  }
		});
		$('.header--mobile-naviation .submenu-level-link').click(function (e) {
		  e.preventDefault();
		  $(".submenu-level-link").closest("li").find(".level-3-menu").slideUp("fast");
		  if ($(this).closest("li").hasClass("active")) {
		    $(this).closest("li").removeClass('active');
		  } else {
		     $(".submenu-level-link").closest("li").removeClass('active');
		     $(this).closest("li").find(".level-3-menu").slideDown();
		     $(this).closest("li").addClass('active');
		  }
		});
		$('.sds-menu-toggle').click(function () {
		  if ($(this).hasClass("active")) {
		    $(".header--mobile-naviation").hide();
		    $(this).removeClass('active');
		  	$('.global-header').removeClass('fixed-head');
		  } else {
		  	$(".header--mobile-naviation").show();
		  	$(this).addClass('active');
		  	$('.global-header').addClass('fixed-head'); 
		  }
		});
    }
};
