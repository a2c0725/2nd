# minimal_devkit

## module環境
- pug
- sass
- autoprefixer
- babel
- pngquant
- jpegoptim
- browser-sync

## png,jpeg圧縮
- 始めにdist/js/bundle.jsのファイルを作成しておかないとエラーが起こる
- `yarn imgmin`でdist/img内のjpg,pngファイルが圧縮される
    - 事前にターミナルで`pngquant`と`Jpegoptim`をインストールする必要がある

```
brew install pngquant

brew install jpegoptim
```
画像の圧縮率を変更したい場合には`package.json`の`imgmin:jpg``imgmin:png`の値を編集。  
`imgmin:png`は`--speed`の数値[ 1（遅い）〜10（速い）]を変更、数値が大きくなれば圧縮率は低くなる。

