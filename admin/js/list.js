webden.ListMenu = (function(W, $){	

	Model = Backbone.Model.extend({
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
		model: Model,
		url : '/api/main/index/listMenu/status/public'
	});

	/* VIEWS */	

/* View for model */

	ViewOne = Backbone.View.extend({
		tagName: 'li',
		template: '#listMenu',
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
	
	return{
		Collections:Collections,
		Views:Views
	};
})(window, jQuery); 



