<?php
class AdminController extends IndexController {
	private $_checklogin = null;
	// start IndexController 
	public function __construct() {
		parent::__construct();
		$this->_checkAuth();
	}

	public function _checkAuth(){
		if($this->_checklogin === null){
			$this->_checklogin = $this->auth->checklogin();  
		}
		return $this->_checklogin;
	}

	// Creation model and view objects 
	protected function makeObj() {
		parent::makeObj();
		$this->auth=new Auth();  
	}

	// Page by default 
	public function getIndexAction () { 
		echo "admin page!";
	} 

	public function getCheckAuthAction() {
		$result = array();
		if($this->_checkAuth()){
			$result['success']= 1;
			$result['result']= 'User registered'; 
		} else {
			$result['success']= 0;
			$result['result']= 'Error in the authorization!'; 
		}
		return $this->viewForAjax->switchFormat($result , $this->format);
	}	
	
	public function getLogoutAction() {
		$result = array();
		if($this->auth->logout()){
			$result['success']= 1;
			$result['result']= 'User logout'; 
		} else {
			$result['success']= 0;
			$result['result']= 'Error in the logout!'; 
		}
		return $this->viewForAjax->switchFormat($result , $this->format);
	}

	public function postAuthAction() {
		$result = array();
		if($this->_checkAuth()){
			$result['success']= 1;
			$result['result']= 'all very well'; 
		} else {
			$result['success']= 0;
			$result['result']= 'Error in the authorization!'; 
		}	
		return $this->viewForAjax->switchFormat($result, $this->format); 
	} 

}