<?php
class Auth {
	public function checklogin () {
		$auth_hash = base64_decode($_SERVER['HTTP_AUTH']);
		$hash = md5(md5($auth_hash.'random!@#'));
		$auth  = split(":", $auth_hash);
		if(ADMIN_PASSWORD == $hash  and ADMIN_LOGIN == $auth[0] ){
			$url =  $_SERVER['HTTP_HOST'];
			$arr = array();
			$arr['login'] = $auth[0]; 
			$arr['access'] = md5(ADMIN_HASH);
			$value = json_encode($arr);
			setcookie("WebAuth", $value, time()+3600, "/admin/", $url);						
			$_SESSION[$auth[0]] = 'auth';
			return true;
		} else{
			return false;
		}
	}
}