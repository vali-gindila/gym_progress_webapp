<?php

$conn = new mysqli("localhost", "root", "", "gym_app");

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if ($name && $email && $password) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo "success"; 
    } else {
        echo "error";
    }

    $stmt->close();
} else {
    echo "error";
}

$conn->close();
?>
