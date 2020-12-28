'use strict';

var formValidation = require('base/components/formValidation');

$(document).ready(function () {
    $('form.checkout-registration').submit(function (e) {
        var form = $(this);
        e.preventDefault();
        var url = form.attr('action');
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: form.serialize(),
            success: function (data) {
                if (!data.success) {
                    formValidation(form, data);
                } else {
                    location.href = data.redirectUrl;
                }
            },
            error: function (err) {
                if (err.responseJSON.redirectUrl) {
                    window.location.href = err.responseJSON.redirectUrl;
                }
            }
        });
        return false;
    });
});
$('.password-eye').click(function() {
	if ($('#newPassword').attr('type') == 'text') {
		$('#newPassword').attr('type', 'password');
		$('.password-eye').removeClass('sds-icon-eye-close');
	} else {
		$('#newPassword').attr('type', 'text');
		$('.password-eye').addClass('sds-icon-eye-close');
	}
});
