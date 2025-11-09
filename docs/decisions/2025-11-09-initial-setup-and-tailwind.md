# 初期セットアップ、バックエンドコンテナ構成、Tailwind 導入（2025-11-09）

概要
- Docker Compose によるローカル開発基盤を整備（フロント: Vite/React、バック: Nginx 経由で Laravel(PHP‑FPM)）。
- README を更新（AWS サーバーレスの方針、ローカル手順、権限調整、Tailwind の補足）。
- フロントエンドに Tailwind CSS を導入し、初期 UI を Tailwind コンポーネントで構成。

主な変更
- バックエンドコンテナ
  - `php:8.2-cli` + `artisan serve` から `php:8.2-fpm`（9000）+ `nginx`（8080）構成へ移行。
  - バックエンド/Nginx ともにアプリのマウント先を `./backend/laravel:/app` に統一。
  - Nginx vhost を追加: `infra/nginx/default.conf`（`/app/public` をルート、FastCGI は `backend:9000`）。
- フロントエンド（Tailwind）
  - `tailwindcss` / `postcss` / `autoprefixer` を追加し設定。
  - `type: module` 環境に合わせ、設定ファイルを CommonJS 形式（`.cjs`）に変更。
  - `index.css` を Tailwind ディレクティブに刷新、`App.jsx` を Tailwind ベースの最小レイアウトに更新。
  - Docker 環境向けに Vite HMR を調整（ポーリング/host・clientPort の明示）。
- README
  - 合意済みテンプレートに沿って全面更新（ポート/パス/手順を明確化）。
  - 「権限の初期化（初回のみ）」を追加（`storage`/`bootstrap/cache`）。
  - Tailwind の導入/利用に関する補足を追記。
- リポジトリ整理
  - `.gitignore` を追加（node_modules/vendor/storage/.env などを除外）。

主要コマンド（運用メモ）
- バックエンド初期化（初回）:
  - `docker compose run --rm backend composer create-project laravel/laravel .`
- 権限調整（初回）:
  - `docker compose run --rm -u root backend bash -lc 'cd /app && mkdir -p storage/framework/{cache,views,sessions} && chown -R www-data:www-data storage bootstrap/cache && find storage -type d -exec chmod 775 {} + && find storage -type f -exec chmod 664 {} + && chmod -R 775 bootstrap/cache'`
- ローカル向け .env 調整:
  - `APP_URL=http://localhost:8080`、`SESSION_DRIVER=file`、`QUEUE_CONNECTION=sync`、`CACHE_STORE=file`
- フロント起動:
  - `docker compose up -d --build frontend`

意図/理由
- 本番の意図（Nginx + FPM）に沿ったローカル構成に揃えつつ、運用コストは AWS サーバーレス（Bref/Lambda）で最小化。
- 権限や環境のつまづきポイントを README に明記し、オンボーディング摩擦を低減。
- Tailwind により、ユーティリティ中心で UI を素早く反復可能に。

フォローアップ
- CI/CD: GitHub Actions（FE: S3 + CloudFront、BE: `serverless deploy`）。
- UI 方針の選定: DaisyUI / shadcn/ui 等の採用検討。
- 任意: コンテナ起動時に `storage`/`bootstrap/cache` の権限を自動調整するエントリポイント追加。
