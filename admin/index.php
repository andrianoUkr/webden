<?php
// session_start();
function check_auth(){
	if($_SERVER['PHP_AUTH_USER'] == 'admin' and $_SERVER['PHP_AUTH_PW'] == 'admin' ) {
			$_SESSION['AUTH'] = 'yes';
	}	
	if($_GET['logout']){
		unset($_SESSION['AUTH']);
	}
	if (!isset($_SESSION['AUTH'])) {
            header('WWW-Authenticate: Basic realm="Secure zone"');
            header('HTTP/1.0 401 Unauthorized');
            exit;
    }	
}
// check_auth();
?>

<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8" />
		<title>ADMIN PAGE</title>	
		<link rel="stylesheet" href="styles/style.css" type="text/css" media="all"/>		
        <script src="js/lib/jquery-1.11.2.js"></script>
        <script src="js/lib/jquery.base64.js"></script>
		<script src="js/lib/jquery.cookie.js"></script>
        <script src="js/lib/underscore.js"></script>
        <script src="js/lib/backbone.js"></script> 
		<script src="js/lib/backbone.localStorage.js"></script>
		<script src="js/main.js"></script>
		<script src="js/index.js"></script>		
		<script src="js/list.js"></script>	
		<script src="js/page.js"></script>		
		<script src="js/route.js"></script>	    
	</head>
    <body>
	<div id="body_wrapper"></div>
		<div id="page_wrapper">
			<div id="header" >HEADER</div>
			<div id="left-sidebar">
				<div id="admin_menu">
					<h3><a href="#">ADMIN PANEL</a></h3>
					<ul>
						<li><a href="./#menu">Изменить Меню</a></li>
						<li><a href="./#content">Изменить Содержание</a></li>
					</ul>
					<br /><br />
					<a href="?logout=yes">Log out</a>
				</div>
				<div id="menu"></div>
			</div>			
			<div id="main"></div>		
		
		</div>
					<div id="footer" >FOOTER</div>
		<div id="loader_wrapper">
			<div id="loader"></div>
		</div>
	
    </body>
</html>
