<?php
require_once('building.php');
require_once('report.php');
$path_components = explode('/', $_SERVER['PATH_INFO']);

if(isset($_REQUEST['type'])&&isset($_REQUEST['single'])){
    header("HTTP/1.0 400 Bad Request");
    print("Cannot call for both type and single");
}


if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if((count($path_components) >= 2) &&
       ($path_components[1] != "")){
        if(isset($_REQUEST['type'])){
            //do it by type
            $typeId = intval($path_components[1]);
            $buildingIds = building::getIdsByType($typeId);
            $report_array = array();
            foreach($buildingIds as $buildId){
                $report_array = array_merge($report_array, report::getIdsByBuilding($buildId));
            }
            $report_array_JSON = array();
            foreach($report_array as $reportID){
                $report_array_JSON[$reportID] = report::findById($reportID)->getJSON();
            }
            header("Content-type: application/json");
            print(json_encode($report_array_JSON));
            exit();
        } else if(isset($_REQUEST['single'])){
            $reportID = intval($path_components[1]);
            header("Content-type: application/json");
            print(report::findById($reportID)->getJSON());
            exit();
        } else {
            //Do it by building
            $buildingId = intval($path_components[1]);
            $report_array = report::getIdsByBuilding($buildingId);
            $report_array_JSON = array();
            foreach($report_array as $reportID){
                $report_array_JSON[$reportID] = report::findById($reportID)->getJSON();
            }
            header("Content-type: application/json");
            print(json_encode($report_array_JSON));
            exit();
        }
    }
    $reportIds = report::getAllIds();
    $reportArray = array();
    foreach($reportIds as $id){
        $reportArray[$id] = report::findById($id)->getJSON();
    }
    header("Content-type: application/json");
    print(json_encode($reportArray));
    exit();
}
?>
