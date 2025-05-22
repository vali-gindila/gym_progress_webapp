<?php
header('Content-Type: application/json');
require 'db.php';

$stmt = $pdo->prepare("
    SELECT date, 
           SUM(reps) as total_reps,
           SUM(weight) as total_weight
    FROM progress
    GROUP BY date
    ORDER BY date ASC
");
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
?>