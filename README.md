# My Portfolio Project (React + Laravel on AWS Serverless)

これは、React と Laravel を AWS サーバーレスアーキテクチャで構築・運用するポートフォリオサイトのプロジェクトです。

## 1. 概要と目的

本プロジェクトは、モダンな技術スタック（React, Laravel, AWS サーバーレス）を用いた開発スキルを証明するためのポートフォリオサイトです。
「低コスト」と「メンテナンスフリー」を最優先事項とし、以下のアーキテクチャを採用しています。

- ローカル開発: Docker Compose を使用し、開発環境の差異を排除します。
- 本番環境: AWS のサーバーレスサービスを全面的に採用し、リクエストがない限りコストがほぼ発生しない構成を実現します。

## 2. アーキテクチャ

### 本番環境 (AWS Serverless)

| 領域 | 使用サービス | 役割 |
| :--- | :--- | :--- |
| フロントエンド | S3 + CloudFront | React のビルド成果物（静的ファイル）を S3 に配置し、CloudFront で HTTPS 化・高速配信。 |
| バックエンド | API Gateway + Lambda + Bref | Laravel アプリケーションを Bref を使って Lambda 関数としてデプロイ。API Gateway がリクエストの窓口。 |
| データベース | なし (初期) | コスト最小化のため、初期段階では DB を使用せず、実績データ等は Laravel 内にハードコード。 |
| CI/CD | GitHub Actions | `main` ブランチへのプッシュをトリガーに、フロントとバックを自動でビルド・デプロイ。 |


### ローカル開発環境 (Docker Compose)

ローカル環境は本番環境の「低コスト」とは目的が異なり、「開発のしやすさと統一性」を目的とします。`docker-compose.yml` により、以下の環境を構築します。

- フロントエンド: Node.js コンテナ (React 開発サーバー/Vite)
- バックエンド: Laravel 実行環境（Nginx + PHP-FPM, PHP 8.2）

## 3. 使用技術 (Tech Stack)

- フロントエンド: React (Vite)
- UI: Tailwind CSS
  - DaisyUI をプラグインとして追加（共通UIの初速向上）
  - 高度UI（Dialog/Popover など）は shadcn/ui（Radix）を段階導入予定
- バックエンド: Laravel
- インフラ (本番): AWS (S3, CloudFront, API Gateway, Lambda)
- デプロイツール: Bref, Serverless Framework
- ローカル開発: Docker, Docker Compose
- CI/CD: GitHub Actions

## 4. ローカル開発環境セットアップ

以下の手順で、ローカルマシンに開発環境を構築します。

### 1. リポジトリのクローン

```bash
git clone [リポジトリのURL]
cd [プロジェクト名]
```

### 2. 所有権の準備（初回推奨）

コンテナが生成するファイルをホストユーザー所有に統一するため、Compose に UID/GID を渡します。

```bash
cp .env.example .env
# 必要に応じて .env の HOST_UID/HOST_GID を編集（通常は 1000:1000）
```

既に root 所有のファイルがある場合は以下で修正できます（sudo が必要）。

```bash
bash scripts/fix-ownership.sh backend/laravel frontend
```

### 3. バックエンドの初期化 (初回のみ)

まだ `backend/laravel` に Laravel を作成していない場合は、コンテナ経由で初期化します。

```bash
docker compose run --rm backend composer create-project laravel/laravel .
```

### 4. 環境変数の設定

バックエンド用の設定ファイルをコピーします。

```bash
cd backend/laravel
cp .env.example .env
```

必要に応じてフロントエンド側も `.env` を用意してください。

### 5. Docker コンテナの起動

プロジェクトのルートディレクトリに戻り、Docker Compose を実行します。

```bash
cd ..
docker compose up -d --build
```

### 6. 依存関係のインストールと初期設定 (初回のみ)

```bash
# バックエンド (Laravel) の依存関係インストール（初回クローン時は必要）
docker compose exec backend composer install

# アプリケーションキーの生成
docker compose exec backend php artisan key:generate

# フロントエンド (React) の依存関係インストール（コンテナ起動時に自動でも実行されます）
docker compose exec frontend yarn install
```

### 7. 権限の初期化（初回のみ）

初回セットアップ後、`storage` と `bootstrap/cache` の書き込み権限を整えます。

```bash
docker compose run --rm -u root backend bash -lc 'cd /app && \
  mkdir -p storage/framework/{cache,views,sessions} && \
  chown -R www-data:www-data storage bootstrap/cache && \
  find storage -type d -exec chmod 775 {} + && \
  find storage -type f -exec chmod 664 {} + && \
  chmod -R 775 bootstrap/cache'
```

補足: Laravel プロジェクト作成をホストユーザーで行う場合は、以下でも可（権限調整が軽減されます）。

```bash
docker compose run --rm -u $(id -u):$(id -g) backend composer create-project laravel/laravel .
```

### 8. アクセス

- フロントエンド (React): `http://localhost:5173`
- バックエンド (Laravel API): `http://localhost:8080`

## 5. デプロイ

本プロジェクトのデプロイは、GitHub Actions によって自動化する方針です。
`main` ブランチ（または指定のブランチ）にプッシュすると、以下のワークフローが自動的に実行されます。

1. フロントエンド: React アプリケーションをビルドし、S3 バケットに同期。CloudFront キャッシュをクリア。
2. バックエンド: `serverless deploy` (Bref) を実行し、Lambda と API Gateway に Laravel アプリケーションをデプロイ。

将来的にワークフローが整備されたら、この節に具体的な Workflow 定義と環境変数を追記します。

### 補足: Bref/Serverless の手動デプロイ準備

```bash
# 依存を追加（インストールは任意のタイミングで）
docker compose exec backend composer require bref/bref bref/laravel-bridge

# デプロイ（AWS 資格情報が必要）
cd backend/laravel
npx serverless deploy --stage prod --region ap-northeast-1
```

### 本番 API エンドポイント（プレースホルダ）

- API (HTTP API): https://{api-id}.execute-api.ap-northeast-1.amazonaws.com
  - カスタムドメインを設定した場合は、その URL をここに記載してください。

---

このテンプレートをベースに、随時更新します。プロジェクト名や各種 URL は環境に合わせて編集してください。

## 補足: フロントエンド UI（Tailwind）

- 本リポジトリはフロントエンドに Tailwind CSS を導入済みです。
- 主要ファイル
  - `frontend/tailwind.config.js`: コンテンツスキャン設定
  - `frontend/postcss.config.js`: PostCSS プラグイン設定
  - `frontend/src/index.css`: `@tailwind base; @tailwind components; @tailwind utilities;`
- 実行
  - `docker compose up -d frontend` で Vite dev サーバーが起動し、Tailwind が反映されます。
- コンポーネント方針（折衷）
  - DaisyUI をプラグインとして導入済み。テーマ切替（`data-theme`）や `btn`/`card` などの共通 UI を素早く構築します。
  - 高度な UI（Dialog, Popover, Combobox など）は shadcn/ui（Radix）を段階導入予定。
  - DaisyUI のテーマ切替例: `<html data-theme="dark">` または JS で `document.documentElement.setAttribute('data-theme', 'dark')`
  - shadcn/ui を導入する際の依存（参考）:
    - `class-variance-authority tailwind-merge @radix-ui/react-dialog @radix-ui/react-popover lucide-react`

## 付録: デプロイ設定ガイド

GitHub Actions（OIDC）での本番デプロイ設定手順は `docs/deploy-setup.md` を参照してください。
