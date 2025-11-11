# SSG 戦略の選定: Vite（vite-plugin-ssr） vs Next.js staticExport

日付: 2025-11-11
決定: フロントは Vite + React を維持し、SSG は `vite-plugin-ssr` を採用する。ホスティングは従来どおり S3 静的配信（CloudFront 前提）。

## 背景
- 現行は React + Vite（CSR）。SEO と初期表示の改善のため、完全静的配信のまま SSG を導入する方針。
- 比較対象は Next.js の `output: 'export'`（staticExport）と、Vite 側に SSG を追加する方式。

## 結論（採用理由）
- リポジトリの方針「変更は最小限・局所的」に合致するのは Vite 側への SSG 追加。
- `vite-plugin-ssr` は Vite のままページ単位で SSR/SSG を導入でき、既存の構成やツールチェーンを大きく変えずに導入可能。
- S3 前提の完全静的配信では、SEO の到達点（事前レンダ HTML 提供）は Next と同等。

## 比較（要点）
- 共通点（S3 完全静的の前提）
  - 事前レンダ HTML を配信でき、クロールの安定化と LCP/FCP の改善に寄与。
  - SSR/ISR は不可（どちらも同様）。動的 OG 画像やオンデマンド再生成は別基盤が必要。
- Next.js `staticExport` の利点
  - `metadata`/`sitemap.ts`/`robots.ts` 等の周辺機能が App Router でまとまっている。
  - React Server Components によるクライアント JS 削減の余地。
  - 一方で、export 時は `next/image` など動的最適化の制約あり。移行コストも発生。
- Vite + `vite-plugin-ssr` の利点（採用）
  - 既存の Vite 構成を維持できるため差分が小さい。
  - ページごとに `prerender()` で出力 URL を制御でき、段階導入が容易。
  - サイトマップ/robots はプラグイン/スクリプトで補完可能。

## 実装メモ（このコミットで追加）
- 主要変更（frontend）
  - 依存: `vite-plugin-ssr`
  - `vite.config.js`: `ssr()` を plugins に追加
  - `index.html`: `#page-view` に変更（CSR エントリを撤去）
  - ディレクトリ: `renderer/` と `pages/` を追加
    - `renderer/_default.page.client.jsx`
    - `renderer/_default.page.server.jsx`
    - `renderer/PageShell.jsx`（既存レイアウトを利用）
    - `pages/index.page.jsx`（`/` をプリレンダ）
  - `package.json` scripts: `build` に `vite-plugin-ssr prerender` を追加

## 運用/ビルド
- ローカル: `cd frontend && yarn install && yarn build`
  - 出力: `frontend/dist/`（静的 HTML/CSS/JS）
- デプロイ: 生成物を S3 にアップロード（CloudFront 経由配信）
- API 連携:
  - 現状はクライアントで fetch（`src/lib/api.ts`）。必要に応じてページの `.page.server.*` に `onBeforeRender` を追加し、ビルド時データ取得→`pageProps` として静的埋め込み可能。

## 今後のタスク（別コミット）
- `sitemap.xml`/`robots.txt` の生成（ビルド時）
- OG/Twitter カード、JSON-LD（構造化データ）の整備
- 必要ページでの `onBeforeRender` によるビルド時データ埋め込み

