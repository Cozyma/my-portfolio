---
title: テスト
description: バックエンドのテスト方針（PHPUnit・トランザクション・Seeder）
tags: [ガイドライン, バックエンド, テスト, PHPUnit, トランザクション]
---

# テスト

## 基本原則

- **DB状態の完全保全**: テスト前後でDBは同一状態
- **手動トランザクション必須**: `DatabaseTransactions` trait 禁止
- **Seederは冪等に**: 何度実行しても同一結果

## テスト構成

| レイヤー | DB | 目的 | カバレッジ |
|---------|-----|------|-----------|
| Unit | なし | ロジック検証 | 主担当 |
| Feature | あり（ロールバック） | DB連携検証 | 補助 |

## 実行コマンド

```bash
# 全テスト
docker compose run --rm backend php vendor/bin/phpunit

# Unitのみ（推奨）
docker compose run --rm backend php vendor/bin/phpunit --testsuite=Unit

# Featureのみ
docker compose run --rm backend php vendor/bin/phpunit --testsuite=Feature
```

## 手動トランザクション（必須パターン）

```php
private const CONN = 'mysql';

public function test_example(): void
{
    DB::connection(self::CONN)->beginTransaction();
    try {
        // Arrange / Act / Assert
    } finally {
        DB::connection(self::CONN)->rollBack();
    }
}
```

## Seeder設計

```php
// 存在チェック型
if (!User::where('email', 'test@example.com')->exists()) {
    User::create([...]);
}

// 削除再作成型
TestData::whereIn('id', $targetIds)->delete();
TestData::insert([...]);
```

## 禁止事項

- `DatabaseTransactions` trait
- `RefreshDatabase` trait
- トランザクションなしのDB操作

## 参考

- 環境構成: `docs/decisions/2026-01-28-backend-testing-environment.md`
- 詳細方針: `docs/decisions/2026-01-28-backend-testing-policy.md`

