---
title: ドキュメント一覧（INDEX）
description: docs配下の全ドキュメントの索引
tags: [索引, ドキュメント]
---

# ドキュメント一覧（INDEX）

| File Path | Title / Description (Japanese) | Tags |
| :--- | :--- | :--- |
| `docs/docs-and-testing-policy.md` | ドキュメント管理方針とテスト基本方針（汎用） | 規約, ドキュメント, テスト, エージェント |
| `docs/deploy-setup.md` | デプロイ設定手順（GitHub Actions + OIDC + AWS） | 運用, デプロイ, CI/CD, AWS, GitHub Actions |

## decisions/

| File Path | Title / Description (Japanese) | Tags |
| :--- | :--- | :--- |
| `docs/decisions/2025-11-09-initial-setup-and-tailwind.md` | 初期セットアップ、バックエンドコンテナ構成、Tailwind導入 | ADR, Docker, Tailwind, 環境構築 |
| `docs/decisions/2025-11-09-ui-strategy-daisyui-and-shadcn.md` | フロントエンドUI方針（DaisyUI + shadcn/ui折衷） | ADR, フロントエンド, UI, DaisyUI, shadcn |
| `docs/decisions/2025-11-10-bref-introduction.md` | Bref for Laravel on AWS Lambda導入 | ADR, バックエンド, AWS, Lambda, Bref |
| `docs/decisions/2025-11-10-ci-deploy-workflow-unverified.md` | CIデプロイワークフロー追加（未検証） | ADR, CI/CD, GitHub Actions, AWS |
| `docs/decisions/2025-11-10-dev-plan-v0.md` | 開発手順v0（レイヤード構成で最小実装） | ADR, 開発計画, アーキテクチャ |
| `docs/decisions/2025-11-10-frontend-structure.md` | フロントエンドのファイル分割戦略（v0） | ADR, フロントエンド, 構成 |
| `docs/decisions/2025-11-10-ownership-strategy.md` | ローカル開発のファイル所有権戦略 | ADR, Docker, 開発環境 |
| `docs/decisions/2025-11-11-deploy-fixes-and-ci-adjustments.md` | デプロイ成功までの修正経緯 | ADR, デプロイ, CI/CD, トラブルシューティング |
| `docs/decisions/2025-11-11-ssg-strategy-vite-vs-next.md` | SSG戦略の選定（Vite vs Next.js） | ADR, フロントエンド, SSG, Vite |
| `docs/decisions/2026-01-28-frontend-testing-environment.md` | フロントエンドテスト環境構築（Playwright + Vitest） | ADR, テスト, フロントエンド, Playwright, Vitest |
| `docs/decisions/2026-01-28-backend-testing-environment.md` | バックエンドテスト環境構築（PHPUnit） | ADR, テスト, バックエンド, PHPUnit, Laravel |

## guidelines/

| File Path | Title / Description (Japanese) | Tags |
| :--- | :--- | :--- |
| `docs/guidelines/frontend.md` | フロントエンド実装ガイドライン（統合版→分割版への移行案内） | ガイドライン, フロントエンド, 索引 |
| `docs/guidelines/backend.md` | バックエンド実装ガイドライン（統合版→分割版への移行案内） | ガイドライン, バックエンド, 索引 |

### guidelines/frontend/

| File Path | Title / Description (Japanese) | Tags |
| :--- | :--- | :--- |
| `docs/guidelines/frontend/README.md` | フロントエンド実装ガイドライン（索引） | ガイドライン, フロントエンド, 索引 |
| `docs/guidelines/frontend/structure.md` | 構成/ディレクトリ | ガイドライン, フロントエンド, 構成 |
| `docs/guidelines/frontend/api-client.md` | APIクライアント | ガイドライン, フロントエンド, API |
| `docs/guidelines/frontend/state-and-data.md` | 状態管理/データ取得 | ガイドライン, フロントエンド, 状態管理 |
| `docs/guidelines/frontend/ui-and-styling.md` | UI/スタイリング | ガイドライン, フロントエンド, UI, Tailwind, DaisyUI |
| `docs/guidelines/frontend/env-and-build.md` | 環境変数/ビルド | ガイドライン, フロントエンド, 環境変数, ビルド |
| `docs/guidelines/frontend/accessibility.md` | アクセシビリティ（a11y） | ガイドライン, フロントエンド, アクセシビリティ |
| `docs/guidelines/frontend/testing.md` | テスト（フロント） | ガイドライン, フロントエンド, テスト |

### guidelines/backend/

| File Path | Title / Description (Japanese) | Tags |
| :--- | :--- | :--- |
| `docs/guidelines/backend/README.md` | バックエンド実装ガイドライン（索引） | ガイドライン, バックエンド, 索引 |
| `docs/guidelines/backend/architecture.md` | アーキテクチャ（Layered） | ガイドライン, バックエンド, アーキテクチャ |
| `docs/guidelines/backend/routing.md` | ルーティング | ガイドライン, バックエンド, ルーティング |
| `docs/guidelines/backend/di-and-providers.md` | DI/プロバイダ | ガイドライン, バックエンド, DI, プロバイダ |
| `docs/guidelines/backend/error-handling.md` | 例外/エラー | ガイドライン, バックエンド, エラー処理 |
| `docs/guidelines/backend/env-and-config.md` | 環境変数/設定 | ガイドライン, バックエンド, 環境変数, 設定 |
| `docs/guidelines/backend/testing.md` | テスト | ガイドライン, バックエンド, テスト |
| `docs/guidelines/backend/contracts-and-openapi.md` | 契約/OpenAPI | ガイドライン, バックエンド, OpenAPI, API契約 |
