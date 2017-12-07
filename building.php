<?php

require_once('locationType.php');

date_default_timezone_set('America/New_York');

class building
{
    private $id;
    private $type;
    private $name;

    public static function connect(){
        return new mysqli("classroom.cs.unc.edu",
                          "davidj96",
                          "password!=abcd1234",
                          "davidj96db");
    }

    public static function findById($id) {
        $mysqli = building::connect();

        $result = $mysqli->query("select * from Building where id = " . $id);
        if($result){
            if($result->num_rows == 0) {
                return null;
            }

            $building_info = $result->fetch_array();

            return new building(intval($building_info['id']),
                                intval($building_info['type']),
                                $building_info['name']);
        }
        return null;
    }

    public static function getAllIds() {
        $mysqli = building::connect();

        $result = $mysqli->query("select id from Building");
        $id_array = array();

        if($result) {
            while ($next_row = $result->fetch_array()) {
                $id_array[] = intval($next_row['id']);
            }
        }
        return $id_array;
    }

    public static function getIdsByType($typeId){
        $mysqli = building::connect();

        $result = $mysqli->query("select id from Building where type = " . $typeId);
        if($result) {
            while ($next_row = $result->fetch_array()) {
                $id_array[] = intval($next_row['id']);
            }
        }
        return $id_array;
    }

    private function __construct($id, $type, $name){
        $this->id = $id;
        $this->type = locationType::findById($type);
        $this->name = $name;
    }

    public function getID() {
        return $this->id;
    }

    public function getType() {
        return $this->type;
    }

    public function getName() {
        return $this->name;
    }

    public function getJSON() {
        $json_obj = array('id' => $this->id,
                          'type' => $this->type,
                          'name' => $this->name);
        return json_encode($json_obj);
    }
}

?>
