webden.Router = (function(W, $){	
	W.listMenu = '';
	var start = Backbone.Router.extend({
		routes: {
			""				: "index",
			":section(/:subsection)(/:subsubsection)"	: "showPage" ,
			// "*other"		: "notFound"
		},
		index: function() {
			webden.ListMenu.Init();
			webden.Page.Init('home');
		},
		showPage: function(section, subsection, subsubsection){
			webden.ListMenu.Init();
			webden.Page.Init.apply($, arguments);			
		},		
		notFound: function(other) {
			vent.trigger('vent:error', 'вы обратились по несуществующему адресу: ' + other)
		}		
	})
	
	return{
		start:start
	};
})(window, jQuery); 

$.get("js/tpl/template.html").success(function(data) { 
	$('body').prepend(data);
	var mycmsRouter = new webden.Router.start;
	Backbone.history.start();
})