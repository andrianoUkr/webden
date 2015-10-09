webden = (function(W, $){		
	var Router = {};
	
	/* CUSTOM EVENT*/
	var Vent = {};
	_.extend(Vent, Backbone.Events);
	
	
	Vent.on('vent:error', function(msg, callback) {
		alert(msg);
		if(callback){
			callback(msg);
		}
	});	
	
	Vent.on('vent:done', function(msg, callback) {
		alert(msg);
		if(callback){
			callback(msg);
		}
	});
	
	
	
	/*  LOADING*/
	function loadStart(){
		$('#loader_wrapper').show();
	};

	function loadStop(){
		$('#loader_wrapper').hide();		
	};
	
	
	return{		
		Router:Router,
		Vent  : Vent,
		loadStart: loadStart,
		loadStop: loadStop
	};
})(window, jQuery); 
