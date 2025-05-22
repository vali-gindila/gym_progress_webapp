<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Verifică dacă JSON-ul a fost decodat corect
if (!$data || !isset($data['day'], $data['muscle'], $data['name'], $data['sets'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid or missing data']);
    exit;
}

$day = ucfirst(strtolower($data['day']));
$muscle = $data['muscle'];
$exercise = $data['name'];
$sets = $data['sets'];
$user_id = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("
        INSERT INTO schedule (user_id, day_of_week, muscle_group, exercise_name, sets, reps, weight)
        VALUES (:user_id, :day, :muscle, :exercise, :sets, 0, 0)
    ");
    $stmt->execute([
        ':user_id' => $user_id,
        ':day' => $day,
        ':muscle' => $muscle,
        ':exercise' => $exercise,
        ':sets' => $sets
    ]);

    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
