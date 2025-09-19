# madoi-sample-ts-react-chat

## Madoiサーバの起動

適当なディレクトリで以下のコマンドを実行し、Madoi の madoi-volatileserver を起動してください。詳細は、[MadoiのREADME](https://github.com/kcg-edu-future-lab/madoi)も参照してください。


```bash
git clone https://github.com/kcg-edu-future-lab/madoi
cd madoi
docker compose up
```

`docker compose up`を実行すると、Madoiのビルドが行われ、madoi-volatileserverが起動します。


## 必要なソフトウェアのインストール

下記のバージョンのnodejsで動作確認を行なっています。

* nodejs (v22.12.0)

## ビルドと起動

まずこのリポジトリをcloneしてください。

```bash
git clone https://github.com/kcg-edu-future-lab/madoi-sample-ts-react-chat
```

次にmadoi-sample-ts-react-chatディレクトリに入り，次のコマンドを実行して関連ライブラリをインストールしてください。

```bash
npm i
```

devコマンドを実行すると，ブラウザが起動し，チャットアプリケーションが表示されます。

```bash
npm run dev
```

静的ビルドを行うには，buildコマンドを実行してください。

```bash
npm run build
```
