require(["jquery", "backbone", "models/localstorage","models/product"], function($, Backbone, LocalStorage,Product) {

	var Router = Backbone.Router.extend({
		routes: {
			"addproduct": "addProduct"
		}
	});
	var router = new Router;
	router.on('route:addProduct', function() {
		productAdd.render();
	});


	var ProductAddView = Backbone.View.extend({
		render: function() {
			var template = _.template($("#addproduct_template").html(), {});
			this.$el.html(template);
		},
		events: {
			"click button#addPdtBtn": "addProduct"
		},
		addProduct :function(){ 
			//add code
			var prdt_name = $("#prdt_name").val();
			if(prdt_name.length < 2 ){
				console.log("Please use a valid name");
				$("#prdt_name").focus();
				return;
			}
			var prdt_description = $("#prdt_description").val();
			var prdt_price = $("#prdt_price").val();
			if((prdt_name.length < 2 )||(isNaN(prdt_price))){
				console.log("Please use a valid price");
				$("#prdt_price").focus();
				return;
			}
			var prdt_qty = $("#prdt_qty").val();
			var prdt_contact = $("#prdt_contact").val();
			if((prdt_contact.length < 2 )||(isNaN(prdt_contact))){
				console.log("Please supply a valid phone contact");
				$("#prdt_contact").focus();
				return; 
			}
			var prdt_location = $("#prdt_location").val();
			if(prdt_location.length < 2 ){
				console.log("Please supply a valid location");
				$("#prdt_location").focus();
				return;
			}
			var prdt_contactName = $("#prdt_contactName").val();

			var product = new Product();
			var _product = {
					name:prdt_name,
					description:prdt_description,
					quantity:prdt_qty,
					price:prdt_price,
					phoneContact:prdt_contact,
					location:prdt_location,
					contactName: prdt_contactName
				};

			product.saveProduct(_product,function(response){
				var feedback = {};
				if(response.success == 0)
					feedback.prdtaddResponse = "product was added succesfully";
				else
					feedback.prdtaddResponse = "An error occured when adding the product";

				var template = _.template($("#addproduct_templateResponse").html(), feedback);
					this.$("#pageArea").html(template);
			}); 
		}
	});

	var productAdd = new ProductAddView({
		el: $("#pageArea")
	});



});