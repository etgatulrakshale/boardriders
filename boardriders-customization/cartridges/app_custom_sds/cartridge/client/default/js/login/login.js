'use strict';

var formValidation = require('base/components/formValidation');
var createErrorNotification = require('base/components/errorNotification');

module.exports = {
    login: function () {
        $('form.login').submit(function (e) {
            var form = $(this);
            e.preventDefault();
            var url = form.attr('action');
            $('form.login').trigger('login:submit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                success: function (data) {
                    if (!data.success) {
                        formValidation(form, data);
                        $('form.login').trigger('login:error', data);
                    } else {
                        $('form.login').trigger('login:success', data);
                        location.href = data.redirectUrl;
                    }
                },
                error: function (data) {
                    if (data.responseJSON.redirectUrl) {
                        window.location.href = data.responseJSON.redirectUrl;
                    } else {
                        $('form.login').trigger('login:error', data);
                    }
                }
            });
            return false;
        });
    },

    register: function () {
        $('form.registration').submit(function (e) {
            var form = $(this);
            e.preventDefault();
            var url = form.attr('action');
            $('form.registration').trigger('login:register', e);
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
                    } else {
                        createErrorNotification($('.error-messaging'), err.responseJSON.errorMessage);
                    }

                }
            });
            return false;
        });
    },

    resetPassword: function () {
        $('.reset-password-form').submit(function (e) {
            var form = $(this);
            e.preventDefault();
            var url = form.attr('action');
            $('.reset-password-form').trigger('login:register', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                success: function (data) {
                    if (!data.success) {
                        formValidation(form, data);
                    } else {
                        $('.request-password-title').text(data.receivedMsgHeading);
                        $('.request-password-body').empty()
                            .append('<p>' + data.receivedMsgBody + '</p>');
                        if (!data.mobile) {
                            $('#submitEmailButton').text(data.buttonText)
                                .attr('data-dismiss', 'modal');
                        } else {
                            $('.send-email-btn').empty()
                                .html('<a href="'
                                    + data.returnUrl
                                    + '" class="btn btn-primary btn-block">'
                                    + data.buttonText + '</a>'
                                );
                        }
                    }
                },
                error: function () {
                }
            });
            return false;
        });
    },

    clearResetForm: function () {
        $('#login .modal').on('hidden.bs.modal', function () {
            $('#reset-password-email').val('');
            $('.modal-dialog .form-control.is-invalid').removeClass('is-invalid');
        });
    },
    boot: function () {
		$('.account-login-head').click(function() {
			$('.account-login-content').toggleClass('account-content-active');
			$('.account-login-expand').toggleClass('account-active');
			$('.account-login-close').toggleClass('account-deactive');
		});
		$('.account-create-head').click(function() {
			$('.account-create-content').toggleClass('account-content-active');
			$('.account-create-expand').toggleClass('account-active');
			$('.account-create-close').toggleClass('account-deactive');
		});
		$('.account-check-order-head').click(function() {
			$('.account-check-order-content').toggleClass('account-content-active');
			$('.account-check-order-expand').toggleClass('account-active');
			$('.account-check-order-close').toggleClass('account-deactive');
		});
		$('.password-eye').click(function() {
			if ($('#login-form-password').attr('type') == 'text') {
		      $('#login-form-password').attr('type', 'password');
		      $('.password-eye').removeClass('sds-icon-eye-close');
		    } else {
		      $('#login-form-password').attr('type', 'text');
		      $('.password-eye').addClass('sds-icon-eye-close');
		    }
		});
		$('.password-eye-reg').click(function() {
			if ($('#registration-form-password').attr('type') == 'text') {
		      $('#registration-form-password').attr('type', 'password');
		      $('.password-eye-reg').removeClass('sds-icon-eye-close');
		    } else {
		      $('#registration-form-password').attr('type', 'text');
		      $('.password-eye-reg').addClass('sds-icon-eye-close');
		    }
		});
		$('.password-eye-con').click(function() {
			if ($('#registration-form-password-confirm').attr('type') == 'text') {
		      $('#registration-form-password-confirm').attr('type', 'password');
		      $('.password-eye-con').removeClass('sds-icon-eye-close');
		    } else {
		      $('#registration-form-password-confirm').attr('type', 'text');
		      $('.password-eye-con').addClass('sds-icon-eye-close');
		    }
		});
		$('.custom-control-input').click(function () {
	        if ($(this).is(':checked')) {
	            $('.register-button').removeAttr('disabled');
	            $('.register-button').addClass('active');
	        } else {
	            $('.register-button').attr('disabled', true);
	            $('.register-button').removeClass('active');
	        }
	    });
	}    
};
