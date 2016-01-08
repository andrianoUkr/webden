webden.Auth = (function(W, $){	
	var viewShow = '';
	ViewAuthForm = Backbone.View.extend({
		tagName: 'div',
		template: '#authForm',
		initialize: function() {
			this.start();
			console.log(this);
		},	
		events: {
			"submit #auth"	:	"auth",
		},
		render: function (){
			this.$el.html($(this.template).html());
			$('#admin_menu').html('');
			$('#main').html(this.el);
			return this;
		},
		close: function () {
			console.log('Kill: ', this);
			this.unbind(); // Unbind all local event bindings
			this.remove(); // Remove view from DOM
	 
		},
		start: function (){
			this.render();
		},
		auth: function(e) {
			e.preventDefault();
			var login = $("#auth [name='login']").val();
			var password = $("#auth [name='password']").val();			
			var auth = $.base64.encode(login + ':' + password);
			$.ajax({
				beforeSend: function(data, opt){
					data.setRequestHeader('Auth', auth);
					webden.loadStart();
				},
				complete: function(data, opt){
					webden.loadStop();
				},
				url: '/api/main/admin/Auth',
				type: 'POST',
				cache: false,
				success: function(data){
					if(data.success == 1){
						webden.routing.navigate('#index', {trigger: true});
					} else {
					alert('Used wrong data for authorization!!!');
					}
				}
			});
			return false;
		}	
	});	

	function render(){
		if(!webden.infoCustom()){
			if(_.result(viewShow, 'render')){
				viewShow.close();
			} 
			viewShow = new ViewAuthForm();		
			return true;
		}
		return false;
	}

	/* Init the current object */
	function Init(){
		if(render() == false){
			webden.routing.navigate('#index', {trigger: true});
		} 
	};	
	
	return{
		Init:Init		
	};
})(window, jQuery); 



