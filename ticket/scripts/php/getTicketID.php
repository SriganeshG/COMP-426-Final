<?php
include 'DbClass.php';
$db = new Db();
$id = $db -> quote($_POST['id']);
//if($priority->id == 1 || $priority->id == 2 || $priority->id == 3 ){
$rows = $db -> select("select t.id,t.name,p.level as priority,c.type as category,t.subject, t.department as department,t.description as tickD from tickets as t join priority as p on t.priority = p.id join categories as c on t.category=c.id where t.id =". $id);
//}
//else 
//$rows = $db -> select("select t.id,t.name,p.level as priority,c.type as category,t.subject, t.department as department from tickets as t join priority as p on t.priority = p.id join categories as c on t.category=c.id");
if($rows)
{
    $db -> close();
    echo json_encode($rows);
}
?>