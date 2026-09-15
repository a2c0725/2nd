# 本番切り替え時のTODO(解約申請フォーム)

問い合わせフォーム(`product/resident/cancellation/form/`)は、現在すべて仮の値・仮環境で実装されています。本番公開前に以下を必ず対応してください。

## 1. reCAPTCHA v3 キーの差し替え

現在のキーは `localhost` 限定で発行した仮キーです。本番ドメイン(`2nd-inc.com`)用のキーを新規取得し、以下2箇所を差し替える。

- `constants/recaptcha.ts` の `RECAPTCHA_SITE_KEY`(サイトキー)
- `public/contact/config.php` の `RECAPTCHA_SECRET_KEY`(シークレットキー)

取得先: https://www.google.com/recaptcha/admin (ドメインに本番ドメインを登録)

## 2. 通知先メールアドレスの差し替え

`public/contact/config.php` の `NOTIFY_TO` が仮アドレス(`daisuke.9240.harley@gmail.com`)になっている。会社側の正式な受信アドレスに差し替える。

## 3. 送信元メールアドレスの確認

`public/contact/config.php` の `NOTIFY_FROM`(`no-reply@2nd-inc.com`)が実在する・送信可能なアドレスかロリポップ側の設定を確認する(存在しない/未設定だと迷惑メール判定や送信エラーの原因になる)。

## 4. 実際のメール送信確認

ローカル環境にはメール送信環境が無いため`mail()`の動作が未検証。ロリポップへのデプロイ後に、以下を実機で確認する。

- 会社宛の通知メールが届くか
- 問い合わせ者宛の自動返信メールが届くか
- 双方とも迷惑メール判定されないか(送信元ドメインのSPF/DKIM設定含む)

## 5. デプロイ確認

`public/contact/send.php` と `config.php` が `yarn build` → `out/contact/` に正しくコピーされ、FTPアップロード後に実際に動作するか確認する。

## 6. 総合動作確認

- 本番reCAPTCHAキーでの送信テスト(スコアによる拒否が発生しないか)
- honeypotが誤って正規ユーザーをブロックしていないか
- 送信完了後の画面表示、エラー時の表示、それぞれ実機(PC/スマホ)で確認
