<?php
class mongoConnect {
    public function __construct($database,$host = null, $port = null){
        $this->host = $host != null? $host : 'localhost';
        $this->port = $port != null? $port : '27017';
        $this->db = $database;
        $this->con = $mongo = new MongoDB\Driver\Manager("mongodb://{$this->host}:{$this->port}/?3t.uriVersion=2&3t.connectionMode=direct&3t.connection.name=local&readPreference=primary");
    }
    public function getManager(){
        return $this->con;
    }
    public function queryCollection($collection,$filter = array(), $options = array()){
        //Filter is criteria for queryCollection//
        //options are what i want back, how i want it back ect //
        //var_dump($filter, $options);
        $where = new MongoDB\Driver\Query($filter, $options);
        $this->currentResult = $this->con->executequery($this->db.'.'.$collection, $where );
        return $this;
    }
    public function aggregateDocuments($collection, $filter = array(), $options = array()){
        $command = new MongoDB\Driver\Command([
            'aggregate' => $collection,
            'pipeline' => [
                ['$limit' => 2 ],
                ['$match' => ['description' => ['$in' => ['bad stuf', 'hi']]
                    ]
                ],
                ['$group' => [
                    '_id' => '$subject'
                    ]
                ]
            ],
            'cursor' => new stdClass,
        ]);
        $cursor = $man->executeCommand('projman', $command);
    }
    public function convertToJson(){
        $bson = MongoDB\BSON\fromPHP($this->currentResult->toArray());
        return MongoDB\BSON\toJSON($bson);
    }
    public function updateDocuments($updates){
        foreach($updates as $update){

        }
    }
    public function updateDocument($collection,$DocumentId = null, $array = array()){
        $write = new MongoDB\Driver\BulkWrite;

        $mongoId = new MongoDB\BSON\ObjectID($DocumentId);
        $do = $write->update(array('_id' => $mongoId), $array );
        //$do = $write->update(array('_id' => $mongoId), array('$set' => $a) );
        $res = $this->con->executeBulkWrite('projman.projects', $write);
    }
    public function altUpdateDocument($collection, $document){
        $write = new MongoDB\Driver\BulkWrite;
        $id = false;
        if(isset($document['_id'])){
            $do= $write->update(array('_id' => $document['_id']), array(
                '$set'  => $document
                ),array('upsert' => true));
        }else{
            $do = $write->insert($document);
        }
        $res = $this->con->executeBulkWrite('projman.'.$collection, $write);
        echo json_encode(
            array(
                'do' => (string)$do,
                'res' => $res
            )
        );
    }
    /*
    public function buildWhere($convert, &$where, $index, $count){
        //handles convertion of strings to bson object
        if($index < $count){ //Determine if we are at the level we need to convert
            $this->buildWhere($convert,$where[$convert[$index]],$index + 1,$count);
            
        }else{ //we are at the appropriate level start converting the array
            for($i=0;$i<count($where);$i++){
                //@ToDo: build swith statement for types of bson object
                $where[$i] = new MongoDB\BSON\ObjectID($where[$i]);
            }
        }
    }*/
    public function checkObject($key){
        if($key === '$oid'){
            return true;
        }elseif($key === '$date'){
            return true;
        }
        return false;
    }
    public function mongoConvert(&$where, $key){
        if($key == '$oid'){
            $where = new MongoDB\BSON\ObjectID($where[$key]);
        }elseif($key === '$date'){
            $date = $where[$key] == ""? time() * 1000 : $where[$key];
            $where = new MongoDB\BSON\UTCDateTime($date);
        }
    }
    public function buildMongoObjects(&$where){
        if(is_array($where) || is_object($where)){
            foreach($where as $key => $value){
                if($this->checkObject($key)){
                    $this->mongoConvert($where, $key);
                }else if($where[$key]){
                    $this->buildMongoObjects($where[$key]);
                }
            }
        }
    }
}
?>