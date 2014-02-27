define(['backbone', "models/constants"], function(Backbone, Constants) {
	return Backbone.Model.extend({
		default: {
			name: '',
			description: "",
			quantity: "",
			price: "",
			phoneContact: "",
            location:""
		},
		saveProduct: function(productDetails,callbackFunction) {
			 $.ajax({
                 url:  Constants.productsUrl(),
                 async: true,
                 dataType: 'json',
                 type: 'POST',
                 data:{'product':productDetails,'function':'save'},
                 success: function(response) {
                 	callbackFunction(response);
                 }
             });
		},
		search:function(productName,callbackFunction){
			$.ajax({
                 url:  Constants.productsUrl(),
                 async: true,
                 dataType: 'json',
                 type: 'POST',
                 data:{'limit':20, 'itemName':productName,'function':'search'},
                 success: function(responseData ) {
                 	 callbackFunction(responseData);
                 }
             });
		}
	});
});