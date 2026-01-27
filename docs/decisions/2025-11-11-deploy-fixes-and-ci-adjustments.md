---
title: デプロイ成功までの修正経緯
description: S3/CloudFront + API Gateway構成の初回デプロイ成功までの修正点まとめ
tags: [ADR, デプロイ, CI/CD, トラブルシューティング]
---

# 2025-11-11: デプロイ成功までの修正経緯（フロント/バック/CI）

本ドキュメントは、S3/CloudFront + API Gateway(Lambda/Bref) 構成における初回デプロイ成功までの修正点を時系列でまとめたものです。AGENTS.md の「最小差分」方針に従い、目的に直結する変更のみを加えています。

## 要約
- フロント: Vite + React に vite-plugin-ssr を導入し SSG 化。出力は `dist/client` をS3配信。
- CI: 変数の明確化、S3同期先修正、CloudFront Invalidation の条件化、sitemap/robots 自動生成、Node/Yarn/Serverless のバージョン整備。
- バック: Laravel/Bref のデプロイで `bootstrap/cache` に起因する失敗をCIで回避。Serverless v3 に固定。

## 変更詳細（時系列）
1) Node/Yarn 整備（Volta）
- 事象: `postcss-load-config@6` が Node >=18 要求、Node 16 で `yarn install` 失敗。
- 対応: Volta で Node 20、Yarn 1 を導入し `frontend/package.json` に pin。
  - `"volta": { "node": "20.11.1", "yarn": "1.22.22" }`

2) Vite に SSG 導入（vite-plugin-ssr）
- 追加: `frontend/renderer/*` `frontend/pages/*`（`Page` は named export）。
- `vite.config.js` に `ssr()` を追加し、`vitePluginSsr: { prerender: true }` を設定（ビルド時に自動プリレンダ）。
- `index.html` のマウントIDを `#page-view` に変更。
- S3 へは `dist/client` のみを配信するよう CI を変更。

3) prerender CLI の不整合を回避
- 事象: CLI 参照パスがESMのbinを期待し、環境により解決できないケース。
- 対応: `vitePluginSsr.prerender: true` でビルド完了時に自動実行。必要時のみ `yarn prerender` で手動実行。

4) sitemap.xml / robots.txt 自動生成
- 追加: `scripts/generate-static.js`（`dist/client` のHTMLを走査しURLを生成）。
- `frontend/package.json` に `postbuild` 追加（ビルド後に自動生成）。
- ベースURLは `SITE_BASE_URL` から取得（未設定時は `http://localhost`）。
- CI で `SITE_BASE_URL` を注入。

5) CI のS3/CloudFront調整
- S3同期先を `frontend/dist/client` に修正。
- Invalidation を条件付きに変更（`CF_DISTRIBUTION_ID` 未設定ならスキップ）。
- CIが参照するRepository Variables（例）
  - `AWS_REGION`, `AWS_OIDC_ROLE_ARN`, `S3_BUCKET`, `SITE_BASE_URL`, `API_BASE_URL`, `CF_DISTRIBUTION_ID(任意)`

6) バックエンド（Laravel/Bref）デプロイ失敗の対処
- 事象: `php artisan package:discover` が `bootstrap/cache` 不在/権限不足で失敗。
- 対応: CI で Composer 実行前に `backend/laravel/bootstrap/cache` を作成し権限付与。
- 事象: Serverless CLI のメジャー差異によるエラー（`frameworkVersion: '3'` と不一致）。
- 対応: CI で `serverless@3` をインストール。

## 残課題/運用メモ
- favicon: `/favicon.ico` が404。`frontend/public/favicon.ico` を追加するだけで解消。
- APIの実URL: `vars.API_BASE_URL` を実API GatewayのURL（例: `https://{api-id}.execute-api.ap-northeast-1.amazonaws.com/api`）に設定。未設定/プレースホルダ(`api.example.com`)だと `net::ERR_NAME_NOT_RESOLVED`。
- CORS: API側で S3/CloudFront のオリジンを許可（GET, 必要ヘッダ）。
- CloudFront: 準備後に `vars.CF_DISTRIBUTION_ID` を設定。Invalidateパスの絞り込み（`/*.html`, `/sitemap.xml`, `/robots.txt` など）や S3 の Cache-Control 最適化は今後対応可。

## 実行コマンド例
- 変数設定（例）
  - `gh variable set AWS_REGION -b "ap-northeast-1" --repo Cozyma/my-portfolio`
  - `gh variable set AWS_OIDC_ROLE_ARN -b "arn:aws:iam::331032863803:role/GitHubActions-DeployRole" --repo Cozyma/my-portfolio`
  - `gh variable set S3_BUCKET -b "my-portfolio-frontend-331032863803" --repo Cozyma/my-portfolio`
  - `gh variable set SITE_BASE_URL -b "http://my-portfolio-frontend-331032863803.s3-website-ap-northeast-1.amazonaws.com" --repo Cozyma/my-portfolio`
  - `gh variable set API_BASE_URL -b "https://{api-id}.execute-api.ap-northeast-1.amazonaws.com/api" --repo Cozyma/my-portfolio`
- S3（ウェブサイトホスティングにする場合）
  - `aws s3 website s3://my-portfolio-frontend-331032863803 --index-document index.html --error-document index.html`

## 参考変更ファイル
- `.github/workflows/deploy.yml`: S3同期先、Invalidate条件、Serverless v3、bootstrap/cache 確保、SITE_BASE_URL注入
- `frontend/vite.config.js`: `ssr()` + `vitePluginSsr.prerender: true`
- `frontend/pages/*`, `frontend/renderer/*`: SSG 構成
- `scripts/generate-static.js`: `sitemap.xml`/`robots.txt` 生成
- `frontend/package.json`: Volta pin, postbuild, scripts 調整

