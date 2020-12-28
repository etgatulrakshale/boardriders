'use strict';

/**
 * appends params to a url
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} button - button that was clicked for email sign-up
 */
function displayMessage(data, button) {
    $.spinner().stop();
    var status;
    if (data.success) {
        status = 'alert-success';
		$('.footer-newsletter-email-success').addClass('success');
        $('.footer-newsletter-block').addClass('showNewsLetterSuccess');
    } else {
        status = 'alert-danger';
	    $('.footer-newsletter-email-block').addClass('isinvalid');
    }

    $('.email-signup-message').html(data.msg);

    setTimeout(function () {
        button.removeAttr('disabled');
    }, 3000);
}
module.exports = function () {
	$('.subscribe-email').on('click', function (e) {
        e.preventDefault();
        var url = $(this).data('href');
        var button = $(this);
        var emailId = $('input[name=hpEmailSignUp]').val();
        $.spinner().start();
        $(this).attr('disabled', true);
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                emailId: emailId
            },
            success: function (data) {
                displayMessage(data, button);
            },
            error: function (err) {
                displayMessage(err, button);
            }
        });
    });
    
    $('.selectvalid').change(function() {
        var selectedText = $(this).children("option:selected").val();;
        if (selectedText != 'G') {
            $(".subscribe-email").addClass('selvalid');
        } else {
            $(".subscribe-email").removeClass('selvalid');
        }
    });
    
    $('.footer-newsletter-email-success-close').click(function ()  {
    	$('.footer-newsletter-block').css('display','none');
    });
    
    
    $('.arrow-up').click(function () {
		  if ($(this).hasClass("active")) {
		  	$(this).removeClass('active');
		    $('.footer-newsletter-block').addClass('showNewsLetter');
		  } else {
		  	$(this).addClass('active');
		  	$('.footer-newsletter-block').removeClass('showNewsLetter');
		  }
	});
    
    var i, item = $(".footer-accordion-button");
	for (i = 0; i < item.length; i++) {
		item[i].onclick = function () {
			$(this).toggleClass("active");
			var panel = $(this).next();
			panel.slideToggle('fast');
		}
	}
};
