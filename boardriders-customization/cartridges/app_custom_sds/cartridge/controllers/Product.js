'use strict';

var server = require('server');
var product = module.superModule;
server.extend(product);

server.get('IncludeLastVisited', server.middleware.include, function (req, res, next) {

	var ArrayList = require('dw/util/ArrayList');
	var ProductMgr = require('dw/catalog/ProductMgr');
	var PRODUCT_ID_PARAMETER_NAME = 'pid';
	var PRODUCT_PIPELINE_NAMES = new ArrayList(
    'Product-Show',
    'Product-ShowInCategory',
    'Link-Product',
    'Link-CategoryProduct');
	
    var numberOfProducts = 8;

        // Gets the click stream.
        var clicks = session.getClickStream().getClicks();

        // build the last visted
        var products = new ArrayList();

        for (var i = clicks.size() - 1; i >= 0; i--) {
            var click = clicks[i];

            // Checks whether it was a product click.
            if (PRODUCT_PIPELINE_NAMES.contains(click.getPipelineName())) {

                var sku = click.getParameter(PRODUCT_ID_PARAMETER_NAME);

                if (sku && sku.length > 0) {
                    // Gets the product.
                    var product = ProductMgr.getProduct(sku);
                    if (product) {
                        // Checks for the product or a shared master.
                        var duplicate = false;
                        for (var j = 0; j < products.size(); j++) {
                            // Calculates a potential master.
                            var p1 = (product.isVariant() ? product.getVariationModel().getMaster() : product);
                            var p2 = (products[j].isVariant() ? products[j].getVariationModel().getMaster() : products[j]);

                            // Checks if it is the same product.
                            if (p1 === p2) {
                                duplicate = true;
                                break;
                            }
                        }

                        // Adds the product if it is not a duplicate.
                        if (!duplicate) {
                            products.add(product);
                        }
                    }
                }
            }

            // Checks whether the maximum is reached.
            if (products.size() >= numberOfProducts) {
                break;
            }
        }

    res.render('/product/lastvisited', { LastVisitedProducts: products });
    next();
});

module.exports = server.exports();
