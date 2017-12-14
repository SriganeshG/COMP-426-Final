<?php
include 'DbClass.php';
//include 'ChromePhp.php';
$db = new Db();
// console.log('Hello console!');
$priority = $db -> quote($_POST['priority']);

//echo $priority;
//if($priority->id == '1' || $priority->id == '2' || $priority->id == '3' ){

$rows = $db -> select("select t.id,t.TimeIssued	as timeIssued, t.description as tickD, t.name,p.level as priority,c.type as category,t.subject, t.department as department, t.DueDate as DueDate from tickets as t join priority as p on t.priority = p.id join categories as c on t.category=c.id join users on users.name = t.name where users=" . $users );
//}
//$rows = $db -> select("select t.id,t.name,p.level as priority,c.type as category,t.subject, t.department as department from tickets as t join priority as p on t.priority = p.id join categories as c on t.category=c.id where priority=" . $priority );
//}
//else{
//$rows = $db -> select("select t.id,t.name,p.level as priority,c.type as category,t.subject, t.department as department from tickets as t join priority as p on t.priority = p.id join categories as c on t.category=c.id");
//}
if($rows)
{
    $db -> close();
    echo json_encode($rows);
  
 // echo 'console.log('. json_encode( $priority ) .')';
  
}
?>

