'use strict';

var server = require('server');
var login = module.superModule; //inherits functionality from next Login.js found to the right on the cartridge path
server.extend(login); //extends existing server object with a list of new routes from the Login.js found by module.superModule

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var URLUtils = require('dw/web/URLUtils');

server.prepend('Show', function (req, res, next) { //adds additional middleware

    if (req.currentCustomer.profile) {
        res.redirect(URLUtils.url('Account-Show'));
    }
    next();
});

server.get('Register',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {

        var Resource = require('dw/web/Resource');

        if (req.currentCustomer.profile) {
            res.redirect(URLUtils.url('Login-Show'));
        }

        var target = req.querystring.rurl || 1;

        var rememberMe = false;
        var userName = '';
        var createAccountUrl = URLUtils.url('Account-SubmitRegistration', 'rurl', target).relative().toString();
        var navTabValue = req.querystring.action;

        if (req.currentCustomer.credentials) {
            rememberMe = true;
            userName = req.currentCustomer.credentials.username;
        }

        var breadcrumbs = [{
            htmlValue: Resource.msg('global.home', 'common', null),
            url: URLUtils.home().toString()
        }];

        var profileForm = server.forms.getForm('profile');
        profileForm.clear();

        res.render('/account/register', {
            navTabValue: navTabValue || 'login',
            rememberMe: rememberMe,
            userName: userName,
            profileForm: profileForm,
            breadcrumbs: breadcrumbs,
            oAuthReentryEndpoint: 1,
            createAccountUrl: createAccountUrl
        });

        next();
    }
);



module.exports = server.exports();