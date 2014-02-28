define(function() {
	return {
		determineSiteUrl: function() {
			var host = window.location.host;
			var host_name = window.location.hostname;
			var protocol = window.location.protocol;
			var url = window.location.href;

			var site_url;
			if (host === "localhost:1234")
				return protocol + "//" + "localhost:1234/farm/server/controller/";
			else //we are assuming that it is online 
				return protocol + "//" + host_name + "/server/controller/";
		},
		productsUrl:function(){
			return this.determineSiteUrl() + "products.php";
		},
		userProfileUrl:function(){
			return this.determineSiteUrl() + "profile.php";
		} 

	}
});