require(["jquery", "underscore", "backbone", "models/product", "models/localstorage","views/productAddView"], function($, _, Backbone, Product, LocalStorage,productAddView) {
	var product = new Product();

	var SearchView = Backbone.View.extend({
		pageResults:15,
		initialize: function() { //BUG a page refresh redirects here
			this.render();
		},
		render: function() {
			var template = _.template($("#search_template").html(), {})
			this.$el.html(template);
		},
		events: {
			"click button#search_button": "searchProducts"
		},
		searchProducts: function(event) {
			var searchItem = $("#search_input").val(); 
			if((searchItem == "")||(typeof(searchItem)=="undefined"))
				$("#search_input").focus();
			else
				product.search(searchItem, this.drawSearchResults); 
		},
		viewAllProducts:function(){
			product.viewAll(this.drawSearchResults); 
		},
		drawSearchResults: function(searchResponse,searchItem,searchAll) { //searchAll noolean to indiicate wether call was made to search all products or just one product
			var productResults = "";  
			if (searchResponse.success == 1)
				productResults = "<li>There were no results for the search item :: "+ searchItem + "</li>";
			else {
				LocalStorage.clearAll();

				var data = searchResponse.data; 
				var count = 1;
				_.each(data, function(_product) {
					var prodt = new Product(_product);

					var productProperties = {};
					productProperties.name = _product.name;
					productProperties.price = _product.price;
					productProperties.location = _product.location;
					productProperties.quantity = _product.quantity;
					productProperties.description = _product.description.trunc(60,true);
					productProperties.id = count;
					var template = _.template($(".search_reslt_product").html(), productProperties);
					productResults += template;

					LocalStorage.store(count, prodt);//store product in localstorage
					count++;
				});
			}
			var productsProperties = {};
			productsProperties.productresults = productResults;
			productsProperties.search_item = searchItem;

			if(searchAll==true)
				var template = _.template($(".all_products").html(),productsProperties);
			else
				var template = _.template($(".search_reslt_products").html(),productsProperties);

			this.$('#pageArea').html(template);
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
			"search": "searchProducts",
			"allproducts" : "viewAllproducts"
		}
	});
	var router = new Router;
	router.on('route:searchProducts', function() {
		search_view.render();
	});
	router.on('route:viewAllproducts', function() {
		search_view.viewAllProducts();
	});

	String.prototype.trunc =
     function(n,useWordBoundary){
         var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + '&hellip;' : s_;
      };

});