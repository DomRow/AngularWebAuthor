<?php
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
	$sql = "INSERT INTO page (page_number, innerHTML, project_id) VALUES (:page_number, :innerHTML, :project_id)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		// $stmt->bindParam("id", $page->id); 
		$stmt->bindParam("page_number", $page->page_number);
		$stmt->bindParam("innerHTML", $page->innerHTML);
		$stmt->bindParam("project_id", $page->project_id);
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
	$sql = "UPDATE page SET page_number=:page_number, innerHTML=:innerHTML, project_id=:project_id WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("page_number", $page->page_number);
		$stmt->bindParam("innerHTML", $page->innerHTML);
		$stmt->bindParam("project_id", $page->project_id);
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