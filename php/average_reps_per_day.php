<?php
header('Content-Type: application/json');
require 'db.php';

try {
    $stmt = $pdo->prepare("
        SELECT date, SUM(reps) as total_reps 
        FROM progress 
        GROUP BY date 
        ORDER BY date ASC
    ");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
