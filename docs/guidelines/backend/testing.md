---
title: テスト
description: バックエンドのテスト方針（PHPUnit）
tags: [ガイドライン, バックエンド, テスト, PHPUnit]
---

# テスト

## テスト構成

| レイヤー | 目的 | 配置 |
|---------|------|------|
| Unit | ロジック単体の検証 | `tests/Unit/` |
| Feature | HTTP経由の機能検証 | `tests/Feature/` |

## 実行コマンド

```bash
# 全テスト実行
docker compose run --rm backend php vendor/bin/phpunit

# Unitのみ
docker compose run --rm backend php vendor/bin/phpunit --testsuite=Unit

# Featureのみ
docker compose run --rm backend php vendor/bin/phpunit --testsuite=Feature
```

## テスト対象の指針

### Unit
- Service層のビジネスロジック
- Helper関数
- Laravelに依存しない純粋なクラス

### Feature
- APIエンドポイント（`/api/health`, `/api/profile`, `/api/works`）
- 認証・認可フロー
- リクエストバリデーション

## 参考

詳細な構成: `docs/decisions/2026-01-28-backend-testing-environment.md`

