<?php
 header("Access-Control-Allow-Origin: *");

$mongo = new MongoDB\Driver\Manager("mongodb://localhost:27017/?3t.uriVersion=2&3t.connectionMode=direct&3t.connection.name=local&readPreference=primary");
echo '<pre>';

$query = new MongoDB\Driver\Query(array());
$result = $mongo->executequery('projman.projects',$query );

$projects = array();
foreach($result as $r){
    $projects[] = $r;
}
//var_dump($projects);
$write = new MongoDB\Driver\BulkWrite;
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

