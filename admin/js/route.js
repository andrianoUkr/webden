webden.Router = (function(W, $){	
	W.listMenu = '';
	var start = Backbone.Router.extend({
		routes: {
			""				: "index",
			"index"			: "index",	
			"auth"			: "auth",
			"logout"		: "logout",	
			"*other"		: "notFound"
		},	
		index: function(){
			webden.Index.Init();
		},
		logout: function(){
			webden.Logout.Init();
		},
		auth: function(){
			webden.Auth.Init();
		},
		notFound: function(other) {
			webden.Vent.trigger('vent:error', 'вы обратились по несуществующему адресу: ' + other)
		}		
		
	})
	
	return{
		start:start
	};
})(window, jQuery); 

$.get("js/tpl/template.html").success(function(data) { 
	$('body').prepend(data);
	webden.routing = new webden.Router.start;
	Backbone.history.start();
})