---
title: CIデプロイワークフロー追加（未検証）
description: GitHub ActionsによるOIDC認証でのフロント/バック自動デプロイ設定
tags: [ADR, CI/CD, GitHub Actions, AWS]
---

# 2025-11-10: CI デプロイワークフロー追加（未検証・env 管理）

目的: main への push をトリガーに、フロント（S3/CloudFront）とバック（Lambda/Bref）を GitHub Actions で自動デプロイする。

決定:
- `.github/workflows/deploy.yml` を追加し、OIDC による AWS 認証で 2 ジョブ構成（frontend/backend）を定義
- ワークフロー全体のパラメータは GitHub リポジトリ変数（vars）で管理
  - `AWS_REGION`, `AWS_OIDC_ROLE_ARN`, `S3_BUCKET`, `CF_DISTRIBUTION_ID`, `API_BASE_URL`
- フロントのビルドで `vars.API_BASE_URL` を `VITE_API_BASE_URL` として注入
- README と `docs/deploy-setup.md` に「未検証（unverified）」である旨と設定手順を明記

現状・制約（未検証）:
- 本ワークフローは現時点で実運用での検証が未実施
- IAM ロールの信頼ポリシー/権限、各種変数値の設定が前提

今後の対応:
- 検証ブランチでの疎通確認（S3 同期/CF 無効化、Serverless デプロイ）
- IAM 権限の最小化（CloudFormation/Lambda/APIGW の `Resource` 絞り込み）
- 必要に応じて `vars` → `secrets` への移行（ロール ARN を秘匿したい場合）

