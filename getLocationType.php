<?php
require_once('building.php');
require_once('locationType.php');
$path_components = explode('/', $_SERVER['PATH_INFO']);

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if((count($path_components) >= 2) &&
       ($path_components[1] != "")){
        $typeId = intval($path_components[1]);
        if($typeId == 0){
            $buildingIds = building::getAllIds();
        } else {
            $buildingIds = building::getIdsByType($typeId);
        }
        $building_array_JSON = array();
        foreach($buildingIds as $id){
            //echo($id);
            $building = building::findById($id);
            $building_name = $building->getName();
            //echo($building_name);
            $building_array_JSON[$id] = building::findById($id)->getName();
        }
        header("Content-type: application/json");
        print(json_encode($building_array_JSON));
        exit();
    }
    $typeIds = locationType::getAllIds();
    $typeArray = array();
    foreach($typeIds as $id){
        $typeArray[$id] = locationType::findByID($id)->getType();
    }
    header("Content-type: application/json");
    print(json_encode($typeArray));
}
?>
