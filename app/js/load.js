require.config({
	paths: {
	    json2: 'vendor/json2',
      backbone: "vendor/backbone-min",
      underscore: "vendor/underscore-min",
      jquery : "vendor/jquery-1.8.2.min",
	},
  shim: {
      underscore: {
          exports: "_",
          deps: ["jquery"],
      },
      backbone: {
          deps: ["underscore"],
          exports: "Backbone"
      }
    },
	waitSeconds: 30
});
require(["jquery","underscore","backbone",'json2'], function($,_,Backbone) {


});
