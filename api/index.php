<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors
ini_set("log_errors", 1);
ini_set("error_log", "C:\Users\user\Desktop\php-error.log");
require 'Slim/Slim.php';

$app = new Slim();

$app->get('/pages', 'getPages');
$app->get('/pages/:id',	'getPage');
$app->get('/pages/search/:query', 'findByName');
$app->post('/pages', 'addPage');
$app->put('/pages/:id', 'updatePage');
$app->delete('/pages/:id',	'deletePage');

$app->run();

function getPages() {
	$sql = "select * FROM page";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$pages = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"page": ' . json_encode($pages) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getPage($id) {
	$sql = "SELECT * FROM page WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$page = $stmt->fetchObject();  
		$db = null;
		echo json_encode($page); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addPage() {
	error_log('addPage\n', 3, 'C:\xampp\php\logs\php_error_log');
	$request = Slim::getInstance()->request();
	$page = json_decode($request->getBody());
	$sql = "INSERT INTO page (page_number, title, project_number, jsonObj) VALUES (:page_number, :title, :project_number, :jsonObj)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		// $stmt->bindParam("id", $page->id); 
		$stmt->bindParam("page_number", $page->page_number);
		$stmt->bindParam("title", $page->title);
		$stmt->bindParam("project_number", $page->project_number);
		$stmt->bindParam("jsonObj", $page->jsonObj);
		$stmt->execute();
		$page->id = $db->lastInsertId();
		$db = null;
		echo json_encode($page); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, 'C:\xampp\php\logs\php_error_log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updatePage($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$page = json_decode($body);
	$sql = "UPDATE page SET page_number=:page_number, title=:title, project_number=:project_number, jsonObj=:jsonObj WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("page_number", $page->page_number);
		$stmt->bindParam("title", $page->title);
		$stmt->bindParam("project_number", $page->project_number);
		$stmt->bindParam("jsonObj", $page->jsonObj);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($page); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deletePage($id) {
	$sql = "DELETE FROM page WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM page WHERE UPPER(title) LIKE :query ORDER BY title";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$pages = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"page": ' . json_encode($pages) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="pages";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>