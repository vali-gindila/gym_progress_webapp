<?php
session_start();
require 'db.php';

$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

foreach ($data as $exercise) {
    $muscle = $exercise['muscle'];
    $name = $exercise['name'];
    $date = $exercise['date'];

    foreach ($exercise['setsData'] as $index => $set) {
        $stmt = $pdo->prepare("
            INSERT INTO progress 
            (user_id, muscle_group, exercise_name, set_number, reps, weight, date) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $user_id,
            $muscle,
            $name,
            $index + 1,
            $set['reps'],
            $set['weight'],
            $date
        ]);
    }
}

echo json_encode(['status' => 'success']);
