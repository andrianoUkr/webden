<?php
session_start();
//error_reporting(E_ALL | E_STRICT); 
//error_reporting(E_ERROR | E_WARNING | E_PARSE);
error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
//error_reporting(E_ALL ^ E_NOTICE);
//error_reporting(0);

require_once '../system/conf.php'; //File with system settings
require_once 'curr_conf.php'; //File with current settings

//Path to load classes
function upload($class){
	$file=$class.'.php';
	if (file_exists(SYSTEM_URL.'class/'.$file)){
		include SYSTEM_URL.'class/'.$file;
	} elseif (file_exists(SYSTEM_URL.'db/'.$file))	{
		include SYSTEM_URL.'db/'.$file;
	} elseif (file_exists(CURR_URL.'controllers/'.$file))	{
		include CURR_URL.'controllers/'.$file;
	} elseif (file_exists(CURR_URL.'models/'.$file)){
		include CURR_URL.'models/'.$file;
	}
}
spl_autoload_register("upload");	
$front=Router::getInstance(); //Router function
$front->route();
