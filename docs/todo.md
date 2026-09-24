# 本番切り替え時のTODO(解約申請フォーム)

問い合わせフォーム(`product/resident/cancellation/form/`)は、現在すべて仮の値・仮環境で実装されています。本番公開前に以下を必ず対応してください。

## 1. reCAPTCHA v3 キーの差し替え ✅ 対応済み

本番ドメイン(`2nd-inc.com`)用のキーを取得し、以下2箇所に反映済み。

- `constants/recaptcha.ts` の `RECAPTCHA_SITE_KEY`(サイトキー)
- `public/contact/config.php` の `RECAPTCHA_SECRET_KEY`(シークレットキー)

## 2. 通知先メールアドレスの差し替え

`public/contact/config.php` の通知先はフォームごとに以下の定数で個別管理している。

- `NOTIFY_TO_CONTACT`(お問い合わせフォーム): `info@2nd-inc.com` に設定済み
- `NOTIFY_TO_RESIDENT`(入居者お手続きフォーム): 仮アドレス(`a2c0725@gmail.com`)のまま。会社側の正式な受信アドレスに差し替える
- `NOTIFY_TO_CANCELLATION`(退去受付フォーム): 仮アドレス(`a2c0725@gmail.com`)のまま。会社側の正式な受信アドレスに差し替える

## 3. 送信元メールアドレスの確認 ✅ 対応済み

`public/contact/config.php` の `NOTIFY_FROM`(`no-reply@2nd-inc.com`)を使い、ロリポップから実際にメール送信して自動返信メールが受信ボックスに正常に届くことを確認済み(4番参照)。ドメインからの送信が問題なく機能している。

## 4. 実際のメール送信確認 ✅ 対応済み

ローカル環境にはメール送信環境が無いため、スターサーバー(`https://hanaparis.com/test2016/`)に一時的にデプロイして検証した(2026-09-16)。

- 会社宛の通知メール(`daisuke.9240.harley@gmail.com`、仮アドレス) → 届いた
- 問い合わせ者宛の自動返信メール → 届いた
- reCAPTCHA v3も、サイトキーのドメイン(`hanaparis.com`)登録後に正常動作を確認

その後、本番ホスティングの**ロリポップ**(`/test`ディレクトリ)へのデプロイでも確認し、問い合わせ者宛の自動返信メールが正常に受信ボックスへ届くことを確認済み。

## 5. デプロイ確認 ✅ 対応済み

`public/contact/send.php` と `config.php` が `yarn build` → `out/contact/` に正しくコピーされ、ロリポップへのFTPアップロード後に実際に動作することを確認済み。

## 6. 総合動作確認 ✅ 対応済み

- 本番reCAPTCHAキーでの送信テスト(スコアによる拒否が発生しないか)
- honeypotが誤って正規ユーザーをブロックしていないか
- 送信完了後の画面表示、エラー時の表示、それぞれ実機(PC/スマホ)で確認

## 7. `next.config.mjs` の `basePath` / `env.NEXT_PUBLIC_BASE_PATH` を必ず外す

検証のため、スターサーバー(`https://hanaparis.com/test2016/`)にサブディレクトリ配置してテストする際に、CSS・画像が読み込まれない問題(`_next/`配下のアセットや`<img src="/img/...">`がドメインルート基準になり404になる)が発生した。対応として `next.config.mjs` に以下を追加している。

```js
basePath: '/test2016',
env: {
  NEXT_PUBLIC_BASE_PATH: '/test2016',
},
```

加えて、CSSの `background-image: url('/img/bg/...')`(SCSSモジュール内、8ファイル)もドメインルート基準の絶対パスのままだと同様に読み込めなかったため、`styles/variables.scss` に `$base-path: '/test2016';` を追加し、各`url()`を `url('#{$base-path}/img/bg/xxx.webp')` の形に変更している。

本番(`https://2nd-inc.com/`)はドメイン直下にそのまま配置する想定のため、**本番デプロイ前に以下を全て元に戻すこと**(残したままだと本番でも `/test2016/` を前提としたパスになり、逆にCSS・画像が読み込めなくなる):

- `next.config.mjs` の `basePath` と `env.NEXT_PUBLIC_BASE_PATH`
- `styles/variables.scss` の `$base-path: '/test2016';` → `$base-path: '';` に戻す(または変数ごと削除して`url()`を元の絶対パスに戻す)

戻した後は必ず再ビルドし、`out/`内の`_next/`パス・`<img src>`・CSSの`background-image`がすべてルート相対(`/img/...`)に戻っていることを確認する。
