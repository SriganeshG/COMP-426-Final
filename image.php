<?php

date_default_timezone_set('America/New_York');

class image
{
    private $id;
    private $reportId;
    private $filename;

    public static function connect(){
        return new mysqli("classroom.cs.unc.edu",
                          "davidj96",
                          "password!=abcd1234",
                          "davidj96db");
    }

    public static function create($rid, $filename){
        $mysqli = image::connect();
        $result = $mysqli->query("insert into Image (reportId, fileName) values (" . $rid . ", " .
					  "'" . $mysqli->real_escape_string($filename) . "')");
        if($result) {
            $id = $mysqli->insert_id;

            return new image($id, $rid, $filename);
        }
        return null;
    }

    public static function findById($id) {
        $mysqli = image::connect();

        $result = $mysqli->query("select * from Image where id = " . $id);
        if($result) {
            if($result->num_rows == 0) {
                return null;
            }

            $image_info = $result->fetch_array();

            return new image(intval($image_info['id']),
                             intval($image_info['reportId']),
                             $image_info['fileName']);
        }
        return null;
    }

    public static function getAllIds() {
        $mysqli = image::connect();

        $result = $mysqli->query("select id from Image");
        $id_array = array();

        if($result){
            while($next_row = $result->fetch_array()) {
                $id_array[] = intval($next_row['id']);
            }
        }
        return $id_array;
    }

    public static function getPicsByReportId($rid){
        $mysqli = image::connect();
        //print("HELLO");
        $result = $mysqli->query("select * from Image where reportID = " . $rid);
        $pic_array = array();
        //print("HELLO");
        if($result){
            //print("HELLO");
            while($next_row = $result->fetch_array()){
                //print("HELLO1");
                $pic_array[] = new image(intval($next_row['id']),
                                         intval($next_row['reportId']),
                                         $next_row['fileName']);
            }
        }
        return $pic_array;
    }

    private function __construct($id, $report, $filename) {
        $this->id = $id;
        $this->reportId = $report;
        $this->filename = $filename;
    }

    public function getId() {
        return $this->id;
    }

    public function getReportId() {
        return $this->reportId;
    }

    public function getFilename() {
        return $this->filename;
    }

}
?>
