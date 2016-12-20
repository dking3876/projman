<?php
include 'mongoConnect.php';

$mongo = new mongoConnect('projman');
$man = $mongo->getManager();
$where = [
    'aggregate' => 'projects',
    'pipeline' => [
        //['$limit' => 2 ],
        ['$match' => ['_id' => ['$in' => [
            ['$oid' => '58063fa3289906228c8e1474'] //id of project allowed to access
        ]]]
        ],
        ['$group' => [
            '_id' => '$subject'
            ]
        ]
    ],
    'cursor' => new stdClass,
];
$mongo->buildMongoObjects($where);
echo '<pre>';
var_dump($where);
$command = new MongoDB\Driver\Command($where);
$cursor = $man->executeCommand('projman', $command);

/* The aggregate command can optionally return its results in a cursor instead
 * of a single result document. In this case, we can iterate on the cursor
 * directly to access those results. */
 echo '<pre>';
$bson = MongoDB\BSON\fromPHP($cursor->toArray());
echo MongoDB\BSON\toJSON($bson);
