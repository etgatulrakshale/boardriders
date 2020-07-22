'use strict';


$('.account-login').click(function() {
	$('.account-login-content').toggleClass('account-content-active');
	$('.account-login-expand').toggleClass('account-active');
	$('.account-login-close').toggleClass('account-deactive');
});
$('.account-create').click(function() {
	$('.account-create-content').toggleClass('account-content-active');
	$('.account-create-expand').toggleClass('account-active');
	$('.account-create-close').toggleClass('account-deactive');
});
$('.account-check-order').click(function() {
	$('.account-check-order-content').toggleClass('account-content-active');
	$('.account-check-order-expand').toggleClass('account-active');
	$('.account-check-order-close').toggleClass('account-deactive');
});
