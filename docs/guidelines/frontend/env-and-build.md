---
title: 環境変数/ビルド
description: フロントエンドの環境変数管理とビルド設定
tags: [ガイドライン, フロントエンド, 環境変数, ビルド]
---

# 環境変数/ビルド

- ローカル: `frontend/.env` に `VITE_API_BASE_URL` を設定。
- CI: GitHub Actions の `vars.API_BASE_URL` を `VITE_API_BASE_URL` としてビルドへ注入。
- Vite は起動/ビルド時に環境変数を読み込むため、変更時は再起動が必要。

