<?php

require_once('building.php');
require_once('image.php');

date_default_timezone_set('America/New_York');

class report
{
    private $id;
    private $building;
    private $room;
    private $issue;
    private $latitude;
    private $longitude;
    private $date; //date type
    private $pictures;

    public static function connect(){
        return new mysqli("classroom.cs.unc.edu",
                          "davidj96",
                          "abcd1234",
                          "davidj96db");
  }

    public static function create($building, $room, $issue, $date, $latitude, $longitude){
        $mysqli = report::connect();
        if ($date == null) {
            $dstr = "null";
        } else {
            $dstr = "'" . $date->format('Y-m-d') . "'";
        }

        $result = $mysqli->query("insert into Report (building, room, issue, date, latitude, longitude) values (" .
                                 $building . ", " .
                                 "'" . $mysqli->real_escape_string($room) . "', " .
                                 "'" . $mysqli->real_escape_string($issue) . "', " .
                                 $dstr . ", " .
                                 $latitude . ", " .
                                 $longitude . ")");

        if($result) {
            $id = $mysqli->insert_id;

            return new report($id, $building, $room, $issue, $date, $latitude, $longitude);
        }
        return null;
    }

    public static function findById($id) {
        $mysqli = report::connect();

        $result = $mysqli->query("select * from Report where id = " . $id);
        if ($result) {
            if ($result->num_rows == 0) {
                return null;
            }

            $report_info = $result->fetch_array();

            if ($report_info['date'] != null){
                $date = new DateTime($report_info['date']);
            } else {
                $date = null;
            }

            return new report(intval($report_info['id']),
                              intval($report_info['building']),
                              $report_info['room'],
                              $report_info['issue'],
                              $date,
                              floatval($report_info['latitude']),
                              floatval($report_info['longitude']));
        }
        return null;
    }

    public static function getAllIds() {
        $mysqli = report::connect();

        $result = $mysqli->query("select id from Report");
        $id_array = array();

        if($result) {
            while ($next_row = $result->fetch_array()) {
                $id_array[] = intval($next_row['id']);
            }
        }
        return $id_array;
    }

    public static function getIdsByBuilding($buildingId){
        $mysqli = report::connect();

        $result = $mysqli->query("select id from Report where building = " . $buildingId);
        $id_array = array();

        if($result) {
            while ($next_row = $result->fetch_array()) {
                $id_array[] = intval($next_row['id']);
            }
        }
        return $id_array;
    }

    private function __construct($id, $building, $room, $issue, $date, $latitude, $longitude){
        $this->id = $id;
        $this->building = building::findByID($building);
        $this->room = $room;
        $this->issue = $issue;
        $this->date = $date;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->pictures = image::getPicsByReportId($id);
        //print(count($this->pictures));
  }

  public function getID() {
    return $this->id;
  }

  public function getBuilding() {
    return $this->building;
  }

  public function getRoom() {
    return $this->room;
  }

  public function getIssue() {
    return $this->issue;
  }

    public function getDate() {
        return $this->date;
    }

    public function getLatitude() {
        return $this->latitude;
    }

    public function getLongitude() {
        return $this->longitude();
    }

    public function getJSON(){
        //if($this->date == null) {
        //    $dstr = null;
        //} else {
        //    $dstr = $this->date->format('Y-m-d');
        //}
        $pic_string_array = array();
        foreach($this->pictures as $picture){
            $pic_string_array[] = $picture->getFilename();
        }

        $json_obj = array('id' => $this->id,
                          'building' => $this->building->getName(),
                          'room' => $this->room,
                          'issue' => $this->issue,
                          'latitude' => $this->latitude,
                          'longitude' => $this->longitude,
                          'date' => $dstr,
                          'pictures' => $pic_string_array);
        return json_encode($json_obj);
    }

    public function getJSONHeader(){
        if($this->date == null) {
            $dstr = null;
        } else {
            $dstr = $this->date->format('Y-m-d');
        }
		//print($this->id);
		//print(gettype($this->building));
        $json_obj = array('id' => $this->id,
                          'building' => $this->building->getName(),
                          'room' => $this->room,
                          'latitude' => $this->latitude,
                          'longitude' => $this->longitude,
                          'date' => $dstr);
		return json_encode($json_obj);
    }
}

?>
