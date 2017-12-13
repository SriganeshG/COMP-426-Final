<?php
session_start();
include 'DbClass.php';
$db = new Db();
$name=$db -> quote($_POST['user_name']);
$pass=md5($_POST['password']);
$rows = $db -> select("select name from users where name=" . $name . " and password='" . $pass . "'");
if($rows)
{
    $db -> close();
   $_SESSION['user']=$rows[0]['name'];
   echo json_encode($rows);
}
else
{
    $db -> close();
   echo json_encode("0");
}

?>