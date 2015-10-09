<?php
//Set charset
header('Content-Type: text/html; charset=utf-8'); //Charset utf-8

//Set database variables
define("DB_HOST", "localhost");//Host of database
define("DB_NAME", "mycms");//name of database
define("DB_USER", "root");//Name of database user
define("DB_PASS", "");//User password	
define("AU_ERROR", "Error request!!!");//User password	

$dir = dirname($_SERVER['PHP_SELF']).'/';
$count_dir = count(explode('/', trim($dir,'/')));
$url = dirname($_SERVER['SCRIPT_FILENAME']).'/';
$system_url = dirname($url).'/system/';

define("DIR", $dir);//directory
define("COUNT_DIR", $count_dir);
define("SYSTEM_URL", $system_url);//url to system
define("CURR_URL", $url);//path site
define("INDEX", "index.php");


define('ADMIN_LOGIN','admin'); //Administrator login
define('ADMIN_PASSWORD','dca59b799661644d264487d8cfefbf1d'); //Administrator password
define('ADMIN_HASH','welkklfkewrerorprkffmqwqwqwbdrpebvjkgfkjfjkgkjfg'); //Administrator hash
