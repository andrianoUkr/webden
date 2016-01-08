webden.Logout = (function(W, $){	
	function logout() {
		$.ajax({
			beforeSend: function(data, opt){
				webden.loadStart();
			},
			complete: function(data, opt){
				webden.loadStop();
			},
			url: '/api/main/admin/logout',
			type: 'GET',
			cache: false,
			success: function(data){
				if(data.success == 1){
					webden.infoCustom(false);
					webden.routing.navigate('#auth', {trigger: true});
					console.log('Load was performed.');
				}
			}
		});
	}

	/* Init the current object */
	function Init(){
		logout();
	};	
	
	return{
		Init:Init		
	};
})(window, jQuery); 



