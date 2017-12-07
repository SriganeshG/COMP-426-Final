<?php
header('Location: http://wwwp.cs.unc.edu/Courses/comp426-f17/users/davidj96/final_project/index.html');
require_once('report.php');
require_once('image.php');

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

$path_components = explode('/', $_SERVER['PATH_INFO']);

if($_SERVER['REQUEST_METHOD'] == "POST") {
    if($_POST['latlongInput']!=null){
        $latlong = explode(',', $_POST['latlongInput']);
    } else {
        $latlong = ["0", "0"];
    }
    $date = new DateTime();
    $new_report = report::create($_POST['buildingName'], $_POST['Room'], $_POST['issue'], $date, floatval($latlong[0]), floatval($latlong[1]));
    $rid = $new_report->getID();


    $total = count($_FILES['files']['name']);
    for($i=0; $i<$total; $i++){
        $tmpFilePath = $_FILES['files']['tmp_name'][$i];
        if($tmpFilePath!=""){
            $newFilePath = __DIR__ . "/imgs/" . basename($_FILES['files']['name'][$i]);
            if(move_uploaded_file($tmpFilePath, $newFilePath)){
                $new_image = image::create($rid, $_FILES['files']['name'][$i]);
            }
        }
    }
}
exit();
?>
