define(['backbone', "models/constants"], function(Backbone, Constants) {
	return Backbone.Model.extend({
		default: {
			name: '',
			description: "",
			quantity: "",
			price: "",
			ownerPhone: ""
		},
		save: function(productDetails,CallbackFunction) {
			 $.ajax({
                 url:  Constants.productsUrl(),
                 async: true,
                 dataType: 'json',
                 success: function(productDetails,callbackFunction) {
                 	callbackFunction("hello");
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