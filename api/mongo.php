<?php
require 'mongoConnect.php';
/*
if(count($_GET)){
    $ajaxData = $_GET;
}else{
    $ajaxData = json_decode(file_get_contents('php://input'), true);
}*/
$action = isset($ajaxData['action'])? $ajaxData['action']: false;
$collection = isset($ajaxData['collection'])? $ajaxData['collection']: false;
if(!$action || !$collection){

    echo json_encode(array(
        "message"       => "You have failed to provide either an action and/or a collection",
        "action"        => $action,
        "collection"    => $collection,
        "success"       => false
    ));
    die();
}
$collection = $ajaxData['collection'];
$mongo = new mongoConnect('projman');

switch($action){
    case 'queryCollection':
    $data = $ajaxData;
    $where = isset($data['where']) && $data['where'] != 'undefined'? json_decode( str_replace('|a|m|p|', '&', $data['where']), true): array();
    $filter = isset($data['filter']) && $data['filter'] != 'undefined'? json_decode(str_replace('|a|m|p|', '&', $data['filter']), true): array();
    if(isset($where['convert'])){
        $convert = explode(".",$where['convert']);
        unset($where['convert']);
        $mongo->buildWhere($convert,$where,0,count($convert));
        
    }else{
        $mongo->buildMongoObjects($where);
    }
    $result = $mongo->queryCollection($collection, $where, $filter)->convertToJson();
    echo $result;
    break;
    case "saveDocument":
    //$document = json_decode($ajaxData['data'], true);
    $document = $ajaxData['data'];
    $mongo->buildMongoObjects($document);
    $mongo->altUpdateDocument($collection, $document);
    break;
    case 'updateDocument':
    $array = array(
        '$push' => array(
            "assets.mockups" => array(
                "fileName"  => "fresh mockup with correction",
                "url"   => "fresh url"
            )
        )
    );
    $mongo->updateDocument($collection, '58063fa3289906228c8e1474', $array);
    break;
}

/*



var_dump($result);
$projects = array();
foreach($result as $r){
    $projects[] = $r;
}
//echo json_encode($projects);
//var_dump($projects);
//$write = new MongoDB\Driver\BulkWrite;
/*
$newProject = array(
    "title" => "my title",
    "description"   => "mydescription",
    "secondary item"    => array(
        "second"    => "one"
    ),
    "someting"  => false
);

$do = $write->insert($newProject);
var_dump($do);
$res = $mongo->executeBulkWrite('projman.projects', $write);
*/
/*
$single = $projects[1];
var_dump($single);
$single->name = "Second Test Project 2016";
var_dump($single);
$a = array( );

$a["assets.mockups.2"] = array(
    "fileName"  => "somenew Name 11 replacement",
    "url"   => "someurl"
);
$b["assets.mockups"] = array(
    "fileName"  => "somenew Name 11 replacement",
    "url"   => "someurl"
);

$do = $write->update(array('_id' => $single->_id), array('$push' => $a) );
$do = $write->update(array('_id' => $single->_id), array('$set' => $a) );
$res = $mongo->executeBulkWrite('projman.projects', $write);


/*
$set when used with the proper array name ie assets.mockups.3 ect will replace the existing field with the correct value
$push when used with the array ie assets.mockups will push a new item into the array
use update only when updating bulk info on document and needs the entire document to not overrite the changes
*/

?>