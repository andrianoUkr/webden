webden.ListMenu = (function(W, $){	
	var viewShow = '';
	
	Model = Backbone.Model.extend({
		initialize: function() {			
			// console.log(this);
		},
		defaults: {
			id: '1',
			link: 'test',
			parent_id: '0',
			id_content: '1',
			public_info: '1',
			alias: 'home',
			sub: ''
		}
	});

	Collections = Backbone.Collection.extend({
		initialize: function() {			
			// console.log(this);
		},	
		model: Model,
		url : '/api/main/index/listMenu/status/public'
	});

	/* VIEWS */	

/* View for model */

	ViewOne = Backbone.View.extend({
		tagName: 'li',
		template: '#listMenu',
		initialize: function() {			
			// console.log(this);
		},		
		render: function (){
			var compiled = _.template($(this.template).html(), this.model.toJSON());
			this.$el.html(compiled);				
			return this;
		}		
	});	

/* View for collections */	

	Views = Backbone.View.extend({
		tagName: 'ul',
		initialize: function() {			
			this.render();
			// console.log(this);
		},			
		render: function (){			
			this.collection.each( function(value){
				var view = new ViewOne({model: value});
				this.$el.append(view.render().el);
				$('#menu').html(this.$el);
			}, this)
			
			return this;
		}
	});
	
	function Init(){
		if(!viewShow){
			var listMenuCollections = new Collections();				
			listMenuCollections.fetch({cache:false}).done(function(){
				viewShow = new Views({collection: listMenuCollections});
			})
		}
	};		
	
	return{
		Init: Init
	};
})(window, jQuery); 



