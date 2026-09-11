@AGENTS.md

## 必須ルール
- Session開始時にはメモリーを確認してから回答する

### コードスタイル (Prettier 互換)
- 2スペースインデント、セミコロンなし
- シングルクォート（JS/JSX）
- 100文字行長、末尾カンマ必須
- 未使用変数は `_` プレフィックスでOK

### CSS（このプロジェクト固有 / Tailwind は不使用）
- スタイルは `styles/`（SCSS）と各コンポーネントの CSS Modules（`*.module.scss`）で記述
- ルートで `@/styles/global.scss` を読み込む（app/layout.tsx）
- 条件付きクラスには `clsx` を使用
- タグ指定styleは使用しない。必ずclass指定styleにすること。
  - ただし `styles/global.scss` 等のリセット/共通スタイルは対象外
