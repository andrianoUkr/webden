<?php
session_start();
//error_reporting(E_ALL | E_STRICT); 
//error_reporting(E_ERROR | E_WARNING | E_PARSE);
error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
//error_reporting(E_ALL ^ E_NOTICE);
//error_reporting(0);

require_once 'conf.php'; //File with main settings
//Path to load classes
function upload($class){
	$file=$class.'.php';
	if (file_exists('class/'.$file)){
		include 'class/'.$file;
	}	
	elseif (file_exists('controllers/'.$file))	{
		include 'controllers/'.$file;
	}
	elseif (file_exists('models/'.$file)){
		include 'models/'.$file;
	}
	elseif (file_exists('views/'.$file)){
		include 'views/'.$file;
	}	
}
spl_autoload_register("upload");	
$front=FrontController::getInstance(); //Router function
$front->route();
