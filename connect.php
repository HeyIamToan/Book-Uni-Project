
<?php
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $remark = $_POST['remark'] ?? '';

    // Validate input
    if (empty($name) || empty($email) || empty($remark)) {
        echo "Please fill in all the fields.";
        exit;
    }

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'bookstore_noted');
    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    } else {
        $stmt = $conn->prepare("INSERT INTO contact (name, email, remark) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $remark);
        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
        $conn->close();
    }
?>
