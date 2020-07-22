 $('.wide-select').click(function() {
	    $('.wide-select').addClass('active');
	    $('.product-tiles').addClass('col-lg-4');
	    $('.column-select').addClass('in-active');
	    
    });
    $('.column-select').click(function() {
	    $('.wide-select').removeClass('active');
	    $('.product-tiles').removeClass('col-lg-4');
	    $('.column-select').removeClass('in-active');
    });
   $('.sds-plp-toggle').click(function() {
        $('.refine-sort-mobile-naviation ').addClass('active-block');
    });
    $('.sds-plp-toggle-close').click(function() {
        $('.refine-sort-mobile-naviation ').removeClass('active-block');
    });
    
    
    $('.category-expand').click(function() {
    if($(this).hasClass('active-menu')){
    	$('.parent-subcategory').slideUp('slow');
    	$(this).removeClass('active-menu');
    }else{
    	$('.parent-subcategory').slideDown('slow');
    	$(this).addClass('active-menu');
    }      
    });