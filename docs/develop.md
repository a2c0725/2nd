# 実装ガイドライン(Pencilエージェント向け)

このドキュメントは、このリポジトリ(株式会社2nd コーポレートサイト)に新しいページ(問い合わせフォーム等)を実装する際に、既存のサイト構成・実装ルールから外れないようにするためのガイドです。実装前に必ず読んでください。

## 1. プロジェクト概要

- 株式会社2nd(東京都東村山の不動産・リフォーム・建築会社)のコーポレートサイト
- Next.js 16 (App Router) + TypeScript + SCSS Modules
- `next.config.mjs` で `output: 'export'` + `trailingSlash: true` を指定した**静的書き出し**(`yarn build` → `out/`)。レンタルサーバー(ロリポップ)にFTPアップロードして公開する運用
  - **この制約が最重要**: API Routes・Server Actions・`next/image`の最適化など、サーバーが必要な機能は一切使えない。フォームのサーバー処理はPHP(`public/`配下に置いて静的書き出し時にそのままコピーさせる)で別途実装する前提。Pencilエージェントは基本的に**フロントエンドのUI/マークアップ実装のみ**を担当し、`fetch`でPHPエンドポイントにPOSTする形を想定する
- 開発サーバー: `yarn dev` (ポート7777, `http://localhost:7777`)
- 型チェック: `yarn type-check` / Lint: `yarn lint`(コードを書いたら必ず両方通すこと)

## 2. ディレクトリ構成

```
app/                  # Next.js App Router のページ実体（ルーティング）
  layout.tsx           # ルートレイアウト（<html>/<head>、共通metadata）
  page.tsx              # トップページ（ホームの全セクションを並べるだけ）
  not-found.tsx          # 404ページ（独立ページの実装例として参考になる）
  product/resident/...    # Product詳細ページ群（後述）

components/
  Layouts/RootShell/       # 全ページ共通の外枠（Header/Footer/スクロール制御）
  Header/, Footer/          # 共通ヘッダー・フッター
  Sections/                  # ホームページの各セクション（1コンポーネント = 1セクション）
  Product/                    # Product詳細ページ群の中身
  Shared/                      # 使い回す部品（Button/Title/Card/Section など）

constants/              # 表示テキスト・データを集約する置き場（後述、最重要）
types/                  # 型定義（全てここに置く。.tsx内でtype/interfaceを直接書かない）
styles/                 # 全体共通のSCSS（変数・mixin・グローバルCSS）
utility/                # 汎用関数（usedClasses など）
hooks/                  # 独自hooks（スクロール連動処理など）
public/                 # 静的ファイル置き場。静的書き出し時にそのまま `out/` にコピーされる
                        # → 新規で作るPHPスクリプトなどはここに置く
```

## 3. ページ構成の2パターン

このサイトのページは大きく2種類ある。新規ページを作る際はどちらに近いか判断すること。

### パターンA: ホームの1セクション（scroll-snapで縦に並ぶ）

`app/page.tsx` が `components/Sections/*` を縦に並べているだけ。各セクションは画面いっぱい(`height: 100dvh`)の1ブロックで、`.container`(`RootShell`内の`<main>`)に対して `scroll-snap-type: y mandatory` がかかっており、ホイール/タッチで1セクションずつスナップする。

```tsx
// app/page.tsx
<Top /><News /><About /><Business /><Product /><Company /><Access /><Contact />
```

### パターンB: 独立ページ（Product詳細ページ、404ページなど）

`app/product/resident/page.tsx` のように、App Router の通常のルーティングで独立したURLを持つページ。中身のコンポーネントは `components/Product/` 配下に置く。

```tsx
// app/product/resident/page.tsx
'use client'
import ResidentSections from '@/components/Product/ResidentSections'
export default function ResidentPage() {
  return <ResidentSections />
}
```

**問い合わせフォームは基本的にパターンBで実装する想定**（`app/contact/page.tsx` のような独立ページ、または既存の`CONTACT`セクション内をフォームUIに置き換える形。着手前にどちらか要確認）。

いずれのパターンでも、1つの「セクション/ページ」の中身は必ず次のDOM構造に従うこと（`RootShell`のHeader/Footerを除いた実コンテンツ部分）。

```tsx
<section className={clsx('section-contents-wrapper', styles.xxx)}>
  <div className="section-contents-inner">
    <BaseTitle navId="xxx" ... />        {/* 見出し。後述 */}
    <div className="section-contents">
      <ScrollableSectionInner>            {/* 実コンテンツ。後述 */}
        ...実際の中身...
      </ScrollableSectionInner>
    </div>
  </div>
</section>
```

- `section-contents-wrapper` / `section-contents-inner` / `section-contents` はグローバルなクラス名文字列（`styles/global.scss`で定義、CSS Modulesのハッシュ化を避けるため文字列のまま使う）。**この3階層は省略しない**
- `ScrollableSectionInner`（後述）でコンテンツ量が多くてスマホで画面に収まらない場合でも縦スクロールできるようにする

## 4. 共通コンポーネント（`components/Shared/`）

新しいUIを作る前に、まずこれらで実現できないか確認すること。

### BaseTitle（`components/Shared/Title/BaseTitle`）

セクション見出し（英字+カナ）を表示する。ナビ連動のスクロールアニメーション付き。

```tsx
<BaseTitle navId="contact" type="white" />
```

- `navId`: `constants/common/nav.ts` の `NAV_ITEMS`（ホーム用）または `PRODUCT_NAV_ITEMS`（Product系ページ用、同ファイル内）の `id` に対応。指定すると `label`/`kana`/`subTitle` を自動解決する
- `navId` を使わずページ固有の見出しにしたい場合は `label`/`kana` を直接渡すことも可能
- `type="white"`: 背景が暗い画像の上に乗る場合に指定（lineの色が変わる）
- 新しいページ(例: contact)の見出しなら、`constants/common/nav.ts` の `NAV_ITEMS` に既に `contact` の項目があるので `navId="contact"` を使えばよい。全く新規のnavIdが必要なら `NAV_ITEMS` または `PRODUCT_NAV_ITEMS` に追加する

### BaseButton（`components/Shared/Button/BaseButton`）

サイト共通のボタン。内部リンクは`next/navigation`の`router.push`、外部リンク(`http`始まり)は`window.open`で新規タブ。

```tsx
<BaseButton text="送信する" url="/contact/thanks" used="contact" />
```

- `text`: ボタン文言（`\n`で改行可、CSS側`white-space: pre-line`対応済み）
- `url`: 遷移先。**`href`という名前は使わない**（このプロジェクトのルール。フィールド名は必ず`url`）
- `used`: 見た目のバリエーション切り替え（`style.module.scss`内の`.contact`や`.product`などのクラス名文字列。後述の「usedパターン」参照）
- ボタンの見た目を追加したい場合、既存の`.contact`/`.product`/`.resident`のような専用クラスを`BaseButton`の`style.module.scss`にわ増やす。**他ページに影響する共通(`.button`)クラス自体は絶対に直接変更しない**

### Card（`components/Shared/Card`）

タイトル+説明文+詳細ボタンのカード。Product一覧セクションで使用中。

```tsx
<Card title="..." description="..." url="/product/resident" used="product" />
```

### ScrollableSectionInner（`components/Shared/Section/ScrollableSectionInner`）

セクション内の実コンテンツを包むラッパー。`section-inner`の代わりに使う。スマホ表示でコンテンツが画面(`100dvh`)に収まらない場合、`overflow-y: auto`で縦スクロール可能にする（横スクロールは出ない、`flex-wrap`も強制的に1列に固定してある）。**新しいセクション/ページを作る際は必ずこれを使う**（生の`<div className="section-inner">`は書かない）。

```tsx
<ScrollableSectionInner>
  {/* 実際の中身 */}
</ScrollableSectionInner>
```

## 5. `used` パターン（見た目のバリエーション切り替え）

`BaseButton`/`Card`/`BaseTitle`などの共通コンポーネントは、呼び出し元ごとに見た目を変えたい場合、専用のCSSクラスを増やすのではなく `used` propで指定する。`utility/usedClasses.ts` が `used`(文字列 or 文字列配列)を、そのコンポーネント自身の`style.module.scss`内の同名クラスに変換する。

```ts
// utility/usedClasses.ts
export function usedClasses(styles: Record<string, string>, used?: string | string[]) {
  if (!used) return []
  return (Array.isArray(used) ? used : [used]).map((key) => styles[key])
}
```

```scss
// BaseButton/style.module.scss
.button { /* デフォルト */ }
&.contact { font-size: 2rem; }   // used="contact" の時だけ適用
&.resident { ... }                // used="resident" の時だけ適用
```

新しいページ専用の見た目が必要なら、既存の`.button`本体は変更せず、`used="contact-form"`のような新しい`used`値と対応するクラスを追加する。

## 6. `constants/` の使い方（最重要）

表示テキスト・データは基本的にコンポーネント内に直書きせず、`constants/`配下にまとめる。ディレクトリは3種類。

```
constants/common/     # サイト全体で共通利用するもの（company.ts, nav.ts）
constants/sections/   # ホームの各セクション専用（hero.ts, about.ts, contact.ts...）
constants/product/     # Product詳細ページ群専用（resident.ts, cancellation.ts, renewal.ts）
```

- **common**: 本当に複数の無関係なページ・コンポーネントから使われるものだけ（会社名・電話番号などの会社情報、グローバルナビ）。判断に迷ったら sections/product 側に置き、実際に複数箇所で必要になってから common に昇格させる
- **sections**: そのセクション1つでしか使わないデータ。ファイル名はセクション名に合わせる（例: `constants/sections/contact.ts` → `components/Sections/Contact`）
- 新しく問い合わせフォームを作るなら `constants/sections/contact.ts`（既存ファイル）にフォーム項目のラベルなどを追記していく想定

### データ形状のルール

- **同じ形の要素が並ぶだけのもの（カード一覧、ボタン一覧、フォームのinput項目一覧など）は必ず配列にする**。コンポーネント側は`.map()`で回す。個別に`item1`/`item2`...のようなキーを増やして都度JSXを複製しない
- 単発の値（見出し文言、説明文など）はオブジェクトのプロパティで定義する
- 例（`constants/product/cancellation.ts`）:
  ```ts
  export const CANCELLATION = {
    step1: {
      heading: '1.賃貸借契約の確認',
      items: [
        { title: '管理者の確認', text: '...' },
        { title: '解約予告期限の確認', text: '...' },
      ],
    },
  } as const
  ```
  ```tsx
  {step1.items.map((item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      <p>{item.text}</p>
    </div>
  ))}
  ```
- **複数行のテキストは`\n`区切りの1つの文字列にまとめる**。コンポーネント側で`<br />`を手書きしない。表示側の`p`/`span`要素のCSSに`white-space: pre-line;`を付けて改行を反映させる
  ```ts
  text: '1行目です。\n2行目です。'
  ```
  ```scss
  .desc { white-space: pre-line; }
  ```
- リンク先を表すフィールド名は必ず **`url`**。`href`という名前は使わない（`<a href>`や`next/link`の`href`propのようなHTML/Next.js標準APIの引数名は対象外、あくまで自分たちで定義するconstantsのデータフィールドの話）
- 画像の`alt`など、他のフィールドと常に同じ値になるものは別フィールドを持たせず、表示側で使い回す（例: `alt={item.title ?? item.body}`）。値が完全に重複するだけのフィールドを増やさない

## 7. 型定義のルール

- **型は全て`types/`配下の`.ts`ファイルに定義し、`import type`で読み込む。`.tsx`ファイル内で`type`/`interface`を直接書かない**
- `constants/*.ts`側でも、インラインのオブジェクト型注釈（`const X: { foo: string }[] = [...]`のような書き方）は禁止。`types/`に named type を切り出して import する
- ファイル名はドメインに合わせる（例: `types/product.ts`, `types/business.ts`, `types/ui.ts`(共通コンポーネントのProps集約)）

```ts
// types/product.ts
export type ProductListItem = {
  title: string
  description: string
  url?: string
}
```
```ts
// constants/sections/product.ts
import type { ProductListItem } from '@/types/product'
export const PRODUCT_LIST_ITEMS: ProductListItem[] = [...]
```

## 8. スタイリングのルール

- SCSS Modules（`*.module.scss`）。Tailwindは不使用
- 各ファイル冒頭で `@use '@/styles/common' as *;` して変数・mixinを読み込む
- **`!important`は使用禁止**。CSS詳細度（セレクタの強さ）で解決すること
- タグ指定のstyle（`p { ... }`など）は使わない。必ずclass指定にする（`styles/global.scss`等のグローバルリセットは例外）
- スマホ対応は `@include mq() { ... }`（`max-width: 768px`のメディアクエリ mixin）を使う
- 色は直接コードを書かず `color(bright)` のように `styles/variables.scss` の `$colors` マップから取得する
- 主要な変数（`styles/variables.scss`）:
  - `$headerHeight` (68px) / `$headerHeightSp` (55px): ヘッダー高さ
  - `$contentsWidth` (80%) / `$contentsSpWidth` (85%): コンテンツ幅
- `.small-device`（JS側で`window.innerHeight <= 680`の時に`body`へ自動付与されるクラス）: 縦幅が狭い端末向けの追加調整に使う。`:global(.small-device) & { ... }`のようにネストして使う
- `.spnone`（スマホで非表示）/ `.pcnone`（スマホのみ表示）というグローバルユーティリティクラスがある

## 9. 開発フロー

1. 実装方針（対象ファイル、変更内容）を先に日本語で説明し、ユーザーの明示的なOKを得てから着手する（このリポジトリの絶対ルール。詳細は `CLAUDE.md` 参照）
2. 実装後は必ず `yarn type-check` と `yarn lint` を実行し、エラーが無いことを確認する
3. 可能であれば `yarn dev` (http://localhost:7777) で実際の表示を確認する
4. コードスタイル: 2スペースインデント、セミコロンなし、シングルクォート、100文字行長、末尾カンマ必須（Prettier互換）

## 10. 問い合わせフォーム実装時の追加コンテキスト

- 現状、`components/Sections/Contact`（`constants/sections/contact.ts`の`CONTACT_BUTTONS`）は外部のGoogleフォームへのリンクボタンになっている。今回はこれを自前のフォームUIに置き換える、または新規ページとして独立させる想定（着手前に要確認）
- サーバー処理はPHP（ロリポップ上、`public/contact/send.php`のような配置で静的書き出し時に`out/`へそのままコピーされる）で別途実装する。**Next.js側（Pencilが担当する部分）はクライアントコンポーネントとしてフォームUIを作り、`fetch`でPHPエンドポイントにPOSTするだけ**。API RoutesやServer Actionsは使えないので実装しないこと
- スパム対策としてhoneypot（非表示のダミー入力欄）+ reCAPTCHA v3を組み込む前提
- フォーム項目（氏名・ふりがな・メールアドレス・電話番号・住所・問い合わせ内容など）やデザインの詳細は未確定。実装前に必ずユーザーに確認すること
