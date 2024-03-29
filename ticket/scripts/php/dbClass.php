<?php
class Db {
    protected static $connection;

    public function connect() {
        if(!isset(self::$connection)) {
            $config = parse_ini_file('config.ini'); 
            self::$connection = new mysqli('classroom.cs.unc.edu',$config['username'],$config['password'],$config['dbname']);
        }
        if(self::$connection === false) {
            return false;
        }
        return self::$connection;
    }

    public function query($query) {
        $connection = $this -> connect();
        $result = $connection -> query($query);
        return $result;
    }

    public function select($query) {
        $rows = array();
        $result = $this -> query($query);
        if($result === false) {
            return false;
        }
        while ($row = $result -> fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function error() {
        $connection = $this -> connect();
        return $connection -> error;
    }

    public function quote($value) {
        $connection = $this -> connect();
        return "'" . $connection -> real_escape_string($value) . "'";
    }
    public function close()
    {
        mysqli_close(self::$connection);
    }
}
?>