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
    'address' => '住所',
    'content' => 'お問い合わせ内容',
];

// 必須項目（フロント側のバリデーションと二重で行う）
const REQUIRED_FIELDS = ['name', 'furigana', 'email', 'content'];

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

foreach (REQUIRED_FIELDS as $key) {
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

function buildAutoReplyBody(array $data): string
{
    $name = $data['name'] ?? '';
    $furigana = $data['furigana'] ?? '';
    $email = $data['email'] ?? '';
    $tel = $data['tel'] ?? '';
    $address = $data['address'] ?? '';
    $content = $data['content'] ?? '';

    return <<<MAIL
{$name} 様

株式会社2ndへお問い合わせいただき、誠にありがとうございます。
以下の内容でお問い合わせを受け付けました。

内容を確認のうえ、担当者よりご連絡いたします。
今しばらくお待ちくださいませ。

――――――――――――――――
■ ご入力内容の確認

【お名前】　　　{$name}
【フリガナ】　　{$furigana}
【メールアドレス】{$email}
【電話番号】　　{$tel}
【ご住所】　　　{$address}
【お問い合わせ内容】
{$content}
――――――――――――――――

入力内容に誤りがあった場合は、お手数ですがお電話にてお知らせください。

売買、賃貸、管理、リフォームまで、お客様の「理想の暮らし」を実現するために心を込めてお手伝いいたします。

【このメールへのご返信について】
本メールは送信専用アドレスより自動送信しております。
本メールへご返信いただいても対応いたしかねますので、ご了承ください。
ご用件がございましたら、お電話にてご連絡ください。

【ご注意】
・数日経っても連絡がない場合は、迷惑メールフォルダをご確認のうえ、お電話でお問い合わせください。
・本メールにお心当たりがない場合は、お手数ですが破棄してください。

━━━━━━━━━━━━━━━━━━━━
二番目でも輝ける世界を。
株式会社2nd
〒189-0013 東京都東村山市栄町2-22-2 Jビル2F
TEL：042-306-4742
営業時間：9:30〜18:00
https://2nd-inc.com/
━━━━━━━━━━━━━━━━━━━━
MAIL;
}

$body = buildBody($data);

// 会社宛 通知メール
mail(
    NOTIFY_TO_CONTACT,
    'お問い合わせフォームより送信がありました',
    $body,
    'From: ' . NOTIFY_FROM
);

// 問い合わせ者宛 自動返信メール
mail(
    $data['email'],
    '【株式会社2nd】お問い合わせを受け付けました',
    buildAutoReplyBody($data),
    'From: ' . NOTIFY_FROM
);

respond(true);
