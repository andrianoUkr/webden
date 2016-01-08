<?php
class Auth {
	public function checklogin () {
		if(!empty($_SESSION['auth'])) {
			return  true;
		} elseif(!empty($_COOKIE['webAuth'])){
			$cookie  = json_decode($_COOKIE['webAuth']);
			// login, password, token
			if($cookie->login ==  ADMIN_LOGIN and $cookie->access == md5(ADMIN_HASH)){
				return true;
			}
		} elseif(!empty($_SERVER['HTTP_AUTH'])) {	
			$auth_hash = base64_decode($_SERVER['HTTP_AUTH']);
			$hash = md5(md5($auth_hash.'random!@#'));
			$auth  = split(":", $auth_hash);
			if(ADMIN_PASSWORD == $hash  and ADMIN_LOGIN == $auth[0] ){
				$url =  $_SERVER['HTTP_HOST'];
				$arr = array();
				$arr['login'] = $auth[0]; 
				$arr['access'] = md5(ADMIN_HASH);
				$value = json_encode($arr);

				setcookie("webAuth", $value, time()+86400, "/", $url, 0, 1);				
				setcookie("infoCustom", $value, time()+86400, "/", $url, 0, 0);
				$_SESSION['auth'] = $auth[0]. '::' . $hash;
				return true;
			} else{
				return false;
			}
		} elseif (!empty($_SERVER['PHP_AUTH_USER']) and !empty($_SERVER['PHP_AUTH_PW']) ) {
			$auth_hash = $_SERVER['PHP_AUTH_USER'].':'. $_SERVER['PHP_AUTH_PW'];
			$hash = md5(md5($auth_hash.'random!@#'));			
			if(ADMIN_PASSWORD == $hash  and ADMIN_LOGIN == $_SERVER['PHP_AUTH_USER']) {
				$url =  $_SERVER['HTTP_HOST'];
				$arr = array();
				$arr['login'] = $_SERVER['PHP_AUTH_USER']; 
				$arr['access'] = md5(ADMIN_HASH);
				$value = json_encode($arr);

				setcookie("webAuth", $value, time()+86400, "/", $url, 0, 1);
				setcookie("infoCustom", $value, time()+86400, "/", $url, 0, 0);
				$_SESSION['auth'] = $_SERVER['PHP_AUTH_USER']. '::' . $hash;
				return true;
			}	
		} elseif(!empty($_GET['auth']) and $_GET['auth'] == 'login') {
			header('WWW-Authenticate: Basic realm="Secure zone"');
			header('HTTP/1.0 401 Unauthorized');
			die('Error Authenticate Basic');
		} else {
			return false;
		}
	}
	
	public function logout(){
		$url =  $_SERVER['HTTP_HOST'];		
		setcookie("infoCustom","", time() - 3600, "/", $url, 0, 0);
		setcookie("webAuth","", time() - 3600, "/", $url, 0, 1);
		unset($_COOKIE['infoCustom']);
		unset ($_COOKIE['webAuth']);	
		unset ($_SESSION['auth']);
		unset($_SERVER['PHP_AUTH_USER']);
		unset($_SERVER['PHP_AUTH_PW']);		
		return  true;
	}
}