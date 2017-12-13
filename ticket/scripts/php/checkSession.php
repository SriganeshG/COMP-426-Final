<?php
session_start();
if(isset($_SESSION['user']))
{
    $id = $_SESSION['user'];
     echo json_encode($id);
}
else
{
   echo json_encode("0");
}

?>