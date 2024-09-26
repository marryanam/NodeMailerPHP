<?php
header("Content-Type: application/json; charset=UTF-8");
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($data['name']) && isset($data['email']) && isset($data['message'])) {
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $message = htmlspecialchars($data['message']);

    $to = "test.m@gmail.com"; 
    $subject = "Новий запит з форми зворотного зв'язку";
    $body = "Ім'я: $name\nЕлектронна пошта: $email\nПовідомлення:\n$message";
    $headers = "From: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Лист успішно відправлено!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Сталася помилка при відправці листа."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Невірний метод запиту або відсутні дані."]);
}
?>
