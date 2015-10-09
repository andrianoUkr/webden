webden.Router = (function(W, $){	
	W.listMenu = '';
	var start = Backbone.Router.extend({
		routes: {
			""				: "index",
			":section(/:subsection)(/:subsubsection)"	: "showPage" ,			
			// "genre/:id"		: "genre",  
			// "*other"		: "notFound"
		},
		getMenu: function(){
			if(listMenu){
				new webden.ListMenu.Views({collection: listMenu});
			} else{
				var listMenuCollections = new webden.ListMenu.Collections();				
				listMenuCollections.fetch({cache:false}).done(function(){
					listMenu=listMenuCollections;
					new webden.ListMenu.Views({collection: listMenuCollections});
				})
			}
		},
		
		index: function() {
			this.getMenu();
			var urlPage = 'api/index/page/alias/';
			var pageId = new webden.Page.Model({id:'home'});
			pageId.urlRoot = urlPage;
			new webden.Page.View({model: pageId});

		},
		
		showPage: function(section, subsection, subsubsection){
			this.getMenu();			
			var section = section || '';
			var subsection = subsection || '';			
			var subsubsection = subsubsection || '';
			
			if(section){
				var idPage = section;
				var urlPage = '/api/main/index/page/alias/';
				if(section == 'page' && subsection){
					idPage = subsection;
					urlPage = '/api/main/index/page/id/';
				};
		
				var pageId = new webden.Page.Model({id:idPage});
				pageId.urlRoot = urlPage;
				new webden.Page.View({model: pageId});
			} 			
			// else {
				//mycmsRouter.navigate('', {trigger: true});
			// }

		},		
		genre: function(id){
			console.log(id);
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
})
var mycmsRouter = new webden.Router.start;
Backbone.history.start();