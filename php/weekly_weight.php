<?php
require 'db.php';

$startOfWeek = date('Y-m-d', strtotime('monday this week'));
$endOfWeek = date('Y-m-d', strtotime('sunday this week'));

$stmt = $pdo->prepare("
    SELECT SUM(weight) as total_weight
    FROM progress
    WHERE date BETWEEN ? AND ?
");
$stmt->execute([$startOfWeek, $endOfWeek]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode(['total' => $row['total_weight'] ?? 0]);
?>