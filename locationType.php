<?php

date_default_timezone_set('America/New_York');

class locationType
{
    private $id;
    private $type;

    public static function connect(){
        return new mysqli("classroom.cs.unc.edu",
                          "davidj96",
                          "password!=abcd1234",
                          "davidj96");
    }

    public static function findById($id) {
        $mysqli = locationType::connect();

        $result = $mysqli->query("select * from LocationTypes where id = " . $id);

        if ($result) {
            if ($result->num_rows==0){
                return null;
            }

            $locationType_info = $result->fetch_array();

            return new locationType(intval($locationType_info['id']),
                                    $locationType_info['type']);
        }
        return null;
    }

    public static function getAllIds() {
        $mysqli = locationType::connect();

        $result = $mysqli->query("select id from LocationTypes");
        $id_array = array();

        if($result) {
            while ($next_row = $result->fetch_array()) {
                $id_array[] = intval($next_row['id']);
            }
        }
        return $id_array;
    }

    private function __construct($id, $type){
        $this->id = $id;
        $this->type = $type;
    }

    public function getID() {
        return $this->id;
    }

    public function getType() {
        return $this->type;
    }

}

?>
