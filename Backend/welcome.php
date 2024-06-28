<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];

    echo "Name: " . htmlspecialchars($name) . "<br>";
    echo "E-mail: " . htmlspecialchars($email);
} else {
    echo "Invalid request method.";
}
?>
