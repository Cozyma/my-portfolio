---
title: 環境変数/設定
description: バックエンドの環境変数管理とLambda運用設定
tags: [ガイドライン, バックエンド, 環境変数, 設定]
---

# 環境変数/設定

- `.env` で環境依存を管理。
- Lambda 運用時は `APP_ENV=production`, `APP_DEBUG=false`, `APP_STORAGE=/tmp`, `LOG_CHANNEL=stderr` 等を設定。
- Serverless/Bref の変数は `serverless.yml` の `provider.environment` で宣言。

