<?php
$conn = new mysqli("localhost", "root", "", "gym_app");

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "success";
} else {
    echo "invalid";
}
?>