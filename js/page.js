webden.Page = (function(W, $){	

	Model = Backbone.Model.extend({
		initialize: function() {			
			// console.log(this);
		},	
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
		template: '#pageId',
		initialize: function() {		
			// this.model.on('request', function(model, data, opt){
				// alert('data');
			// }, this);		
			// console.log(this);
			this.model.on('sync', function(model, data, opt){
				if(data.success  == 0) {
					webden.Vent.trigger('vent:error', 'error page: ' + model.get('id'));
				} else {
					this.render();
				}				
			}, this);
			this.model.on('error', function(model, data, opt){
				console.log('error page');		
			}, this);
			
			this.start();			
		},	
		render: function (){
		
			var data = this.model.toJSON();
			if(data.img.trim() != '') {
				data.img = '<p> Цена: <b>'+ data.img +'</b> грн.</p>';
			}
			
			if(data.price == 0) {
				data.price =  '';
			} else {
				data.price = '<p> Цена: <b>'+ data.price+'</b> грн.</p>';
			}			
			
			if(data.blog){
				this.template = '#blogList';				
				var compiled_blog='';
				var template_blog ="#blogWrapper";
				if(data.blog.length > 0){
					_.each(data.blog, function(item){
						compiled_blog+=_.template($(template_blog).html(), item);
					})
				} else{
					compiled_blog+=_.template($(template_blog).html(), data.blog);
				}
				data.compiled_blog = compiled_blog;			
			}	
			if(data.parent_content > 0){
				this.template = '#blogId';
			}
			
			var compiled = _.template($(this.template).html(), data);
			this.$el.html(compiled);
			var div = this.$el;	
			$(div).find('a.click_back').click(
				function(e){
					e.preventDefault();
					history.back();
				}	
			);
			$('#main').html(this.el);			
			return this;
		},
		events: {
			"click #back"	:	"back",
		},
		start: function (){
			this.model.fetch({
				cache:false, 
				beforeSend: function(data, opt){
					webden.loadStart();
				},
				complete: function(data, opt){
					webden.loadStop();
				}
			});		
		},
		back: function(e) {
			e.preventDefault();
			W.history.back();
		}
	});	
	
	function Init(section, subsection, subsubsection){
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
			var pageId = new Model({id:idPage});
			pageId.urlRoot = urlPage;
			new View({model: pageId});
		} 		
	}
	
	return{
		Init:Init
	};
})(window, jQuery); 



