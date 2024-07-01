<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "company_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['dayIndex']) && isset($data['time']) && isset($data['type'])) {
    $employee_id = 1; // Replace with the actual employee ID
    $employee_name = "John Doe"; // Replace with the actual employee name
    $date = date('Y-m-d', strtotime($data['time']));
    $time = date('Y-m-d H:i:s', strtotime($data['time']));

    if ($data['type'] == 'in') {
        $sql = "INSERT INTO clockin (employee_id, employee_name, day, clock_in) VALUES ('$employee_id', '$employee_name', '$date', '$time')
                ON DUPLICATE KEY UPDATE clock_in='$time'";
    } else {
        $sql = "INSERT INTO clockin (employee_id, employee_name, day, clock_out) VALUES ('$employee_id', '$employee_name', '$date', '$time')
                ON DUPLICATE KEY UPDATE clock_out='$time'";
    }

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Clock time recorded successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid data"]);
}

$conn->close();
?>
