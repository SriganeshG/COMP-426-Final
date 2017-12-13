<?php
session_start();
include 'DbClass.php';
$db = new Db();
$userName = $db -> quote($_POST['userName']);
$password = md5($_POST['password']);
$rows = $db -> select("select * from users where name=" . $userName);
if($db->error() != '')
{
    $error = $db->error();
    $db -> close();
    echo json_encode($error);
}
else
{
    if(count($rows) > 0)
    {
      echo json_encode("0");
    }
    else
    {
      
            $result = $db -> query("INSERT INTO users (name,password) VALUES (" . $userName . ",'" . $password . "')");
            $db -> close();
            $_SESSION['user']=$userName;
            echo json_encode("1");
    }
}

?>