# Frontend (Vite + React + SSG)

- ランタイム: Vite + React
- スタイル: Tailwind + DaisyUI
- SSG: vite-plugin-ssr（完全静的出力を S3 配信）

## 開発

```
yarn dev
```

## ビルド（SSG）

```
yarn build
# 自動でプリレンダが走ります（`vite.config.js` の `vitePluginSsr.prerender: true`）。
# 個別実行したい場合は以下:
# yarn prerender
```

- 出力: `dist/`（静的 HTML/CSS/JS）
- デプロイ: `dist/` をそのまま S3 へアップロード（CloudFront 推奨）

## ルーティング/ページ

- 追加ページは `frontend/pages/*.page.jsx` として作成。
- デフォルトレイアウト: `renderer/PageShell.jsx`（既存 `src/app/Layout.jsx` を使用）
- プリレンダ対象 URL は各ページの `export function prerender()` で制御。

## サーバーデータの事前取得（任意）

- 必要に応じて `*.page.server.jsx` に `onBeforeRender()` を実装し、ビルド時に API から取得したデータを `pageProps` として埋め込めます。
