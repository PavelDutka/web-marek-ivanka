<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Basic validation
    if ($name && filter_var($email, FILTER_VALIDATE_EMAIL) && $phone && $message) {
        $to = 'info@marekivanka.cz';
        $subject = 'Nová zpráva z kontaktního formuláře';
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body = "Jméno: $name\n";
        $body .= "Email: $email\n";
        $body .= "Telefon: $phone\n";
        $body .= "Zpráva:\n$message\n";

        if (mail($to, $subject, $body, $headers)) {
            echo '<h2>Děkujeme za zprávu!</h2><p>Vaše zpráva byla úspěšně odeslána. Ozveme se vám co nejdříve.</p>';
        } else {
            echo '<h2>Chyba při odesílání</h2><p>Omlouváme se, zprávu se nepodařilo odeslat. Zkuste to prosím později nebo nás kontaktujte přímo na info@marekivanka.cz.</p>';
        }
    } else {
        echo '<h2>Neplatné údaje</h2><p>Vyplňte prosím všechna pole a zadejte platný email.</p>';
    }
} else {
    header('Location: index.html');
    exit();
}
?> 