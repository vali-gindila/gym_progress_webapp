<?php
header('Content-Type: application/json');

$pdo = new PDO("mysql:host=localhost;dbname=proiet", "root", "");

$stmt = $pdo->query("SELECT date, COUNT(*) as workouts FROM progress GROUP BY date");
$data = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $timestamp = strtotime($row['date']);  // NU multiplica cu 1000
    $data[$timestamp] = (int)$row['workouts'];
}

echo json_encode($data);
?>
