<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// 各フィールドの label（メール本文用）
const FIELD_LABELS = [
    // 1.賃貸借契約情報
    'buildingName' => '建物名',
    'roomNumber' => '部屋号室',
    'postalCode' => '郵便番号',
    'address' => '住所',
    'addressDetail' => '以降の住所（番地まで）',
    // 2.ご解約情報
    'cancellationTarget' => '解約をご希望の契約',
    'cancellationDate' => '解約希望日',
    'rentAgreement' => '解約についての同意',
    'cancellationReason' => '解約理由',
    'witnessDate' => '立会希望日',
    'witnessTime' => '立会希望時間',
    'witnessPerson' => '立会人',
    'witnessContact' => '立会人ご連絡先',
    // 3.ご契約者様情報
    'contractorName' => 'ご契約者氏名',
    'contractorFurigana' => 'フリガナ（契約者）',
    'contractorBirthday' => '生年月日',
    'contractorPostalCode' => '郵便番号（契約者）',
    'contractorAddress' => '契約者住所',
    'contractorAddressDetail' => '以降の住所（契約者）',
    'contractorTel' => '契約者電話番号',
    'email' => 'メールアドレス',
    'workplaceName' => '勤務先名',
    'workplaceTel' => '勤務先電話番号',
    'residentName' => '入居者名（法人の場合）',
    'residentTel' => '入居者電話番号',
    // 4.転居先情報
    'relocationStatus' => '転居先の決定状況',
    'relocationPostalCode' => '郵便番号（転居先）',
    'relocationAddress' => '住所（転居先）',
    'relocationAddressDetail' => '以降の住所（転居先）',
    'relocationTel' => '電話番号（転居先）',
    // 5.精算金振込先口座
    'bankCode' => '金融機関コード',
    'bankName' => '金融機関名',
    'branchCode' => '支店番号',
    'branchName' => '支店名',
    'accountType' => '口座種別',
    'accountNumber' => '口座番号',
    'accountHolderName' => '名義人',
    'accountHolderFurigana' => 'フリガナ（名義人）',
];

// 必須項目（フロント側のバリデーションと二重で行う。入居者名・入居者電話番号・転居先情報の詳細は任意項目）
const REQUIRED_FIELDS = [
    'buildingName', 'roomNumber', 'postalCode', 'address', 'addressDetail',
    'cancellationTarget', 'cancellationDate', 'rentAgreement', 'cancellationReason',
    'witnessDate', 'witnessTime', 'witnessPerson', 'witnessContact',
    'contractorName', 'contractorFurigana', 'contractorBirthday', 'contractorPostalCode',
    'contractorAddress', 'contractorAddressDetail', 'contractorTel', 'email',
    'workplaceName', 'workplaceTel',
    'relocationStatus',
    'bankCode', 'bankName', 'branchCode', 'branchName', 'accountType', 'accountNumber',
    'accountHolderName', 'accountHolderFurigana',
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
        $value = $data[$key] ?? '';
        if ($value === '') continue;
        $lines[] = "{$label}: {$value}";
    }
    return implode("\n", $lines);
}

$body = buildBody($data);

// 会社宛 通知メール
mail(
    NOTIFY_TO,
    '退去受付フォームより送信がありました',
    $body,
    'From: ' . NOTIFY_FROM
);

// 問い合わせ者宛 自動返信メール
mail(
    $data['email'],
    '【株式会社2nd】退去受付フォームの送信ありがとうございます',
    "この度はご連絡いただき誠にありがとうございます。\n以下の内容で受け付けいたしました。\n\n" . $body,
    'From: ' . NOTIFY_FROM
);

respond(true);
