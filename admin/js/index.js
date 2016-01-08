webden.Index = (function(W, $){
	var viewShow = '';
	/* VIEWS */	
	ViewUserRoom = Backbone.View.extend({
		tagName: 'div',
		template: '#userRoom',
		initialize: function() {
			this.start();
			console.log(this);
		},	
		render: function (){
			var compiled = _.template($(this.template).html(), webden.infoCustom());
			this.$el.html(compiled);		
		
			$('#main').html('');
			$('#admin_menu').html(this.el);
			return this;
		},
		events: {
			'click #remove-all': 'closeAll'
		},
		start: function (){
			this.render();
		}
	});	
	
	function checkAuth(){
		return $.ajax({	
			beforeSend: function(data, opt){
				webden.loadStart();
			},
			complete: function(data, opt){
				webden.loadStop();
			},
			url: '/api/main/admin/checkAuth',
			cache: false,
			success: function(data){
				if(data.success == 1 && $.cookie('infoCustom')){
					// webden.infoCustom = $.parseJSON($.cookie('infoCustom'));
					return true;				
				} else {
					webden.routing.navigate('#auth', {trigger: true});
				}
			}
		});		
	};	
	
	function render(){
		if(webden.infoCustom()){
			if(_.result(viewShow, 'render')){
				viewShow.render();
			} else {
				viewShow = new ViewUserRoom();				
			}	
			return true;
		}
		return false;
	}
	/* Init the current object */
	function Init(){
		if(render() == false){
			$.when(checkAuth()).done(function(){
				render();
			}.bind(this));		
		}
	};		
	
	return{
		Init:Init			
	};
})(window, jQuery); 
