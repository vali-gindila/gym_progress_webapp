<?php
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=proiect', 'root', '');

// nu mai luam $muscle, scoatem filtrul

$stmt = $pdo->prepare("SELECT date, SUM(weight) as total_weight, SUM(reps) as total_reps FROM progress GROUP BY date ORDER BY date");
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
?>
