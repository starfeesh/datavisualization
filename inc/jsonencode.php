<?php
require_once 'db.php';

$result = $dbcon->query("
SELECT
    countries.name,
	exports.units,
    products.uom
FROM exports
INNER JOIN countries
	ON exports.country_id = countries.country_id
INNER JOIN products
	ON exports.product_id = products.product_id
WHERE products.name = 'Banana'
ORDER BY exports.units DESC
LIMIT 4
;");
$row = $result->fetchAll(PDO::FETCH_OBJ);
echo json_encode($row);
?>
