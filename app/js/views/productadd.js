require(["jquery", "backbone", "models/localstorage"], function($, Backbone, LocalStorage) {

	var Router = Backbone.Router.extend({
		routes: {
			"addproduct": "addProduct"
		}
	});
	var router = new Router;
	router.on('route:addProduct', function() {
		productAdd.render();
	});


	var ProductAdd = Backbone.View.extend({
		render: function() {
			var template = _.template($("#addproduct_template").html(), {});
			this.$el.html(template);
		},
		events: {
			"click input[type=button]": "addProduct"
		},
		addProduct :function(){
			//add code
		}
	});

	var productAdd = new ProductAdd({
		el: $("#pageArea")
	});



});