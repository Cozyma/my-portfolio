---
title: Bref for Laravel on AWS Lambda導入
description: 本番バックエンドをAWS Lambda + API Gatewayに載せるためのBref導入決定
tags: [ADR, バックエンド, AWS, Lambda, Bref]
---

# 2025-11-10: Introduce Bref for Laravel on AWS Lambda

目的: 本番環境のバックエンドを AWS Lambda + API Gateway に載せるため、Laravel に Bref を導入する。

決定:
- `backend/laravel/serverless.yml` を追加し、`web(FPM)` と `artisan(CLI)` 関数を定義
- Lambda 向け環境変数（`APP_STORAGE=/tmp` など）を設定
- Serverless Framework プラグインとして `./vendor/bref/bref` を使用
- 依存に `bref/bref` と `bref/laravel-bridge` を追加

影響範囲:
- ローカル開発（Docker: Nginx + PHP-FPM）は変更なし
- デプロイ時のみ Serverless Framework と AWS 認証が必要

デプロイ手順（概要）:
1) `docker compose exec backend composer require bref/bref bref/laravel-bridge`
2) `cd backend/laravel && npx serverless deploy --stage prod --region ap-northeast-1`

備考:
- 低コスト運用を優先し、DB は当面未使用
- 必要に応じて API Gateway のドメインやカスタムドメインを今後追加

