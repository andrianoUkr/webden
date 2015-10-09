webden.Index = (function(W, $){	

	Model = Backbone.Model.extend({
		defaults: {
			id: '1',
			link: 'home',
			parent_id: '0',
			id_content: '1',
			public_info: '1',
			alias: 'homee'
		}
	});

	/* VIEWS */	
/* View for model */
	View = Backbone.View.extend({
		tagName: 'div',
		initialize: function() {
			this.start();			
		},	
		render: function (){
			var template = "<div>Hello to Admin Panel</div>";
			var compiled = _.template($(template).html());
			this.$el.html(compiled);
			var div = this.$el;	
			$(div).find('a.click_back').click(
				function(e){
					e.preventDefault();
					history.back();
				}	
			);
			$('#main').html('dsddd');			
			return this;
		},
		events: {
			"click #back"	:	"back",
		},
		start: function (){
		
		},
		back: function(e) {
			e.preventDefault();
			W.history.back();
		}
	});	
	
	return{
		Model:Model,
		View:View
	};
})(window, jQuery); 



