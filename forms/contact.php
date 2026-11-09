<?php
/**
 * Contact form handler
 * Uses PHP Email Form library (BootstrapMade pro) if available,
 * otherwise falls back to native PHP mail().
 */

header('Content-Type: text/plain; charset=utf-8');

// ── Sanitize & validate inputs ──
$name    = isset($_POST['name'])    ? htmlspecialchars(strip_tags(trim($_POST['name'])),    ENT_QUOTES, 'UTF-8') : '';
$email   = isset($_POST['email'])   ? filter_var(trim($_POST['email']),   FILTER_SANITIZE_EMAIL)                : '';
$subject = isset($_POST['subject']) ? htmlspecialchars(strip_tags(trim($_POST['subject'])), ENT_QUOTES, 'UTF-8') : '';
$message = isset($_POST['message']) ? htmlspecialchars(strip_tags(trim($_POST['message'])), ENT_QUOTES, 'UTF-8') : '';

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo 'Please fill in all required fields.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Invalid email address.';
    exit;
}

$receiving_email_address = 'odeepakmishra@gmail.com';

// ── Try PHP Email Form library first ──
if (file_exists($lib = '../assets/vendor/php-email-form/php-email-form.php')) {
    include $lib;
    $contact               = new PHP_Email_Form;
    $contact->ajax         = true;
    $contact->to           = $receiving_email_address;
    $contact->from_name    = $name;
    $contact->from_email   = $email;
    $contact->subject      = $subject;
    $contact->add_message($name,    'From');
    $contact->add_message($email,   'Email');
    $contact->add_message($message, 'Message', 10);
    echo $contact->send();
    exit;
}

// ── Fallback: native mail() ──
$headers  = "From: Portfolio Contact <no-reply@deepakmishra.dev>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body  = "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Subject: {$subject}\n\n";
$body .= "Message:\n{$message}\n";

if (mail($receiving_email_address, $subject, $body, $headers)) {
    echo 'OK';
} else {
    http_response_code(500);
    echo 'Mail could not be sent. Please contact me directly at odeepakmishra@gmail.com';
}
