'use strict';

var formValidation = require('base/components/formValidation');

module.exports = {
    submitProfile: function () {
        $('form.edit-profile-form').submit(function (e) {
            var $form = $(this);
            e.preventDefault();
            var url = $form.attr('action');
            $('form.edit-profile-form').trigger('profile:edit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function (data) {
                    if (!data.success) {
                        formValidation($form, data);
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
    },

    submitPassword: function () {
        $('form.change-password-form').submit(function (e) {
            var $form = $(this);
            e.preventDefault();
            var url = $form.attr('action');
            $('form.change-password-form').trigger('password:edit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function (data) {
                    if (!data.success) {
                        formValidation($form, data);
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
    },
    boot: function () {
		$('.password-eye').click(function() {
			if ($('#password').attr('type') == 'text') {
		      $('#password').attr('type', 'password');
		    } else {
		      $('#password').attr('type', 'text');
		    }
		});
		$('.myaccount-sidebar-head').click(function() {
			$('.myaccount-sidebar-list').slideToggle();
			$(this).toggleClass('active');
		});
	}
};
