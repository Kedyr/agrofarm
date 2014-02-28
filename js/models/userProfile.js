define(['backbone', "constants"], function(Backbone, Constants) {
	return Backbone.Model.extend({
		default: {
			phoneNumber: ''
		},
		save: function(phoneNumber,CallbackFunction) {
			 $.ajax({
                 url:   Constants.userProfileUrl(),
                 async: true,
                 dataType: 'json',
                 success: function(phoneNumber,callbackFunction) {
                 	callbackFunction("hello");
                 }
             });
		},
	});
});