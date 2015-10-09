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
			this.template = '#authForm';
			this.$el.html($(this.template).html());
			var div = this.$el;	
			// $('#auth').submit(function(){
			// alert('Форма auth отправлена на сервер.');
			// return false;
			// });
			$('#main').html(this.el);			
			return this;
			
						
		},
		events: {
			"submit #auth"	:	"auth",
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
				beforeSend : function (data) {
					data.setRequestHeader('Auth', auth);
				},				
				url: '/api/main/index/Auth',
				type: 'POST',
				cache: false,
				success: function(){
					console.log('Load was performed.');
				}
			});
		}
	});	
	
	return{
		Model:Model,
		View:View
	};
})(window, jQuery); 



