<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = 'info@marekivanka.cz'; // Změň na svůj e-mail
    $subject = 'Zpráva z kontaktního formuláře';

    // Encode subject for UTF-8
    $encoded_subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    // Sestavení těla zprávy
    $body = "Jméno: " . $_POST['name'] . "\n";
    $body .= "Email: " . $_POST['email'] . "\n";
    $body .= "Telefon: " . $_POST['phone'] . "\n";
    $body .= "Zpráva:\n" . $_POST['message'];

    // Set headers for UTF-8
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
    $headers .= "From: info@marekivanka.cz\r\n";
    $headers .= "Reply-To: " . $_POST['email'] . "\r\n";

    // Odeslání
    if (mail($to, $encoded_subject, $body, $headers)) {
        header('Location: dekujeme.html');
        exit();
    } else {
        echo 'Chyba při odesílání.';
    }
} else {
    echo 'Neplatný požadavek.';
}
?>
