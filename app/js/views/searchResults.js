require(["jquery", "underscore", "backbone", "models/product", "models/localstorage"], function($, _, Backbone, Product, LocalStorage) {
	var product = new Product();

	var SearchView = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			var template = _.template($("#search_template").html(), {})
			this.$el.html(template);
		},
		events: {
			"click input[type=button]": "searchProducts"
		},
		searchProducts: function(event) {
			var searchItem = $("#search_input").val();
			product.search(searchItem, this.drawSearchResults);
		},
		drawSearchResults: function(searchResponse) {
			if (searchResponse.success == 1)
				console.log("no results");
			else {
				LocalStorage.clearAll();

				var data = searchResponse.data;
				var count = 1;
				_.each(data, function(_product) {
					var prodt = new Product(_product);

					productProperties = {};
					productProperties.name = _product.name;
					productProperties.price = _product.price;
					productProperties.location = _product.location;
					productProperties.quantity = _product.quantity;
					productProperties.id = count;
					var template = _.template($(".search_reslt_product").html(), productProperties);
					this.$('#pageArea').append(template);

					LocalStorage.store(count, prodt);//store product in localstorage
					count++;
				});
			}
		}

	});
	var search_view = new SearchView({
		el: $("#pageArea")
	});

	var Products = Backbone.Collection.extend({
		model: Product
	});
	var products = new Products();

	var Router = Backbone.Router.extend({
		routes: {
			"search": "searchProducts"
		}
	});
	var router = new Router;
	router.on('route:searchProducts', function() {
		search_view.render();
	});

});