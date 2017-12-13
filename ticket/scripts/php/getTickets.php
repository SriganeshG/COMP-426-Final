<?php
include 'DbClass.php';
//include 'ChromePhp.php';
$db = new Db();
// console.log('Hello console!');
$priority = $db -> quote($_POST['priority']);


//if($priority->id == 1 || $priority->id == 2 || $priority->id == 3 ){
//$rows = $db -> select("select t.id,t.name,p.level as priority,c.type as category,t.subject, t.department as department from tickets as t join priority as p on t.priority = p.id join categories as c on t.category=c.id where priority = '" . "' $priority '" . "')");
//}else{
//    $rows = $db-> select("Select t.id, t.name, p.level as priority, c.type as category, t.subject, t.department as department from tickets as t join priority as p on t.priority = p.id join categories as c on t.category=c.id");
//}

$rows = $db -> select("select t.id,t.name,p.level as priority,c.type as category,t.subject, t.department as department from tickets as t join priority as p on t.priority = p.id join categories as c on t.category=c.id where priority=" .$priority);

if($rows)
{
    $db -> close();
    echo json_encode($rows);
  
 // echo 'console.log('. json_encode( $priority ) .')';
  
}
?>
