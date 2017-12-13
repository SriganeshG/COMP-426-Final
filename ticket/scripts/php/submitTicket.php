<?php
include 'DbClass.php';
$db = new Db();
$userName = $db -> quote($_POST['userName']);
$subject = $db -> quote($_POST['subject']);
$category = $db -> quote($_POST['category']);
$priority = $db -> quote($_POST['priority']);
$description = $db -> quote($_POST['description']);
$department = $db -> quote($_POST['department']);
$result = $db -> query("INSERT INTO tickets (name,category,priority,subject,description,department) VALUES (" . $userName . "," . $category . "," . $priority . "," . $subject . "," . $description . "," . $department . ")");
 $db -> close();
echo json_encode("1");
?>