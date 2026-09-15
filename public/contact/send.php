<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// 各フィールドの label（メール本文用）
const FIELD_LABELS = [
    'name' => '名前',
    'furigana' => 'フリガナ',
    'email' => 'メールアドレス',
    'tel' => '電話番号',
    'contactMethod' => 'ご希望の連絡方法',
    'postalCode' => '郵便番号',
    'address' => '住所',
    'buildingName' => '建物名 / 部屋番号',
    'addressDetail' => '以降の住所',
    'subject' => 'ご用件',
    'content' => 'お問い合わせ内容',
];

function respond(bool $success, string $message = ''): never
{
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Method Not Allowed');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(false, '不正なリクエストです');
}

// honeypot: 埋まっていたらbotとみなし、成功したフリをして何もしない
if (!empty($data['website'])) {
    respond(true);
}

// reCAPTCHA v3 検証
$token = $data['recaptchaToken'] ?? '';
$verifyResponse = @file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify?' . http_build_query([
        'secret' => RECAPTCHA_SECRET_KEY,
        'response' => $token,
    ])
);
$verify = $verifyResponse ? json_decode($verifyResponse, true) : null;
if (!($verify['success'] ?? false) || ($verify['score'] ?? 0) < RECAPTCHA_SCORE_THRESHOLD) {
    respond(false, 'reCAPTCHA認証に失敗しました');
}

// 必須項目の空チェック（フロント側のバリデーションと二重で行う）
foreach (array_keys(FIELD_LABELS) as $key) {
    if (trim((string)($data[$key] ?? '')) === '') {
        respond(false, '入力内容に不備があります');
    }
}
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    respond(false, 'メールアドレスの形式が正しくありません');
}

function buildBody(array $data): string
{
    $lines = [];
    foreach (FIELD_LABELS as $key => $label) {
        $lines[] = "{$label}: " . ($data[$key] ?? '');
    }
    return implode("\n", $lines);
}

$body = buildBody($data);

// 会社宛 通知メール
mail(
    NOTIFY_TO,
    '【next_2nd】解約申請フォームより送信がありました',
    $body,
    'From: ' . NOTIFY_FROM
);

// 問い合わせ者宛 自動返信メール
mail(
    $data['email'],
    'お問い合わせありがとうございます',
    "この度はお問い合わせいただき誠にありがとうございます。\n以下の内容で受け付けいたしました。\n\n" . $body,
    'From: ' . NOTIFY_FROM
);

respond(true);
