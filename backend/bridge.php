<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ta_desktop";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function createPengajuan($conn, $user_id, $tanggal_pengajuan, $waktu, $status, $keterangan) {
    $sql = "INSERT INTO pengajuan (user_id, tanggal_pengajuan, waktu, status, keterangan) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issss", $user_id, $tanggal_pengajuan, $waktu, $status, $keterangan);
    if ($stmt->execute()) {
        echo "Pengajuan created successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

function readPengajuan($conn) {
    $sql = "SELECT * FROM pengajuan";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "ID: " . $row["id"] . " - User ID: " . $row["user_id"] . " - Tanggal: " . $row["tanggal_pengajuan"] . " - Status: " . $row["status"] . " - Keterangan: " . $row["keterangan"] . "<br>";
        }
    } else {
        echo "No records found.";
    }
}

function updatePengajuanStatus($conn, $id, $status) {
    $sql = "UPDATE pengajuan SET status = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $id);
    if ($stmt->execute()) {
        echo "Pengajuan status updated successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

function deletePengajuan($conn, $id) {
    $sql = "DELETE FROM pengajuan WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo "Pengajuan deleted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

// Save date to the database
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/save-date') {
    $data = json_decode(file_get_contents('php://input'), true);
    $event_date = $data['event_date'];

    if ($event_date) {
        $sql = "INSERT INTO events (event_date) VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $event_date);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Date saved successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to save date."]);
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input."]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/create-pengajuan') {
    $data = json_decode(file_get_contents('php://input'), true);
    createPengajuan($conn, $data['user_id'], $data['tanggal_pengajuan'], $data['waktu'], $data['status'], $data['keterangan']);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/read-pengajuan') {
    readPengajuan($conn);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && $_SERVER['REQUEST_URI'] === '/update-pengajuan-status') {
    $data = json_decode(file_get_contents('php://input'), true);
    updatePengajuanStatus($conn, $data['id'], $data['status']);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $_SERVER['REQUEST_URI'] === '/delete-pengajuan') {
    $data = json_decode(file_get_contents('php://input'), true);
    deletePengajuan($conn, $data['id']);
}

$conn->close();
?>