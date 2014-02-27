require(["jquery", "backbone", "models/localstorage"], function($, Backbone, LocalStorage) {

	var Router = Backbone.Router.extend({
		routes: {
			"product/:id": "getProduct"
		}
	});
	var router = new Router;
	router.on('route:getProduct', function(id) {
		//get product from localstorage
		if (!LocalStorage.checkExists(id))
			console.log("doesn't exist");
		else {
			productView.render(id);
		}
	});

	var ProductView = Backbone.View.extend({
		render: function(id) {
			var product = LocalStorage.retrieve(id);

    		productProperties = {};
			productProperties.name = product.name;
			productProperties.price = product.price;
			productProperties.qty = product.quantity;
			productProperties.contact = product.phoneContact;
			productProperties.description = product.description; 
			productProperties.location = product.location;

			var template = _.template($("#product_template").html(), productProperties);
			this.$el.html(template);
		}
	});

	var productView = new ProductView({
		el: $("#pageArea")
	});

	Backbone.history.start();


});