---
title: バックエンドテスト環境構築（PHPUnit）
description: LaravelデフォルトのPHPUnit構成の確認と運用方針
tags: [ADR, テスト, バックエンド, PHPUnit, Laravel]
---

# バックエンドテスト環境構築（2026-01-28）

## 概要

バックエンド（Laravel）のテスト環境を確認・整備。Laravelデフォルトで提供されるPHPUnitベースのテスト構成を採用し、Unit/Featureの二層構成で運用。

## テスト戦略

| レイヤー | 目的 | 対象 |
|---------|------|------|
| Unit | ロジック単体の検証 | Service、Helper、独立したクラス |
| Feature | HTTPリクエスト経由の機能検証 | Controller、API エンドポイント |

## 構成

### ディレクトリ構成

```
backend/laravel/
├── phpunit.xml           # PHPUnit設定
├── tests/
│   ├── TestCase.php      # 基底テストクラス
│   ├── Unit/             # ユニットテスト
│   │   └── ExampleTest.php
│   └── Feature/          # フィーチャーテスト
│       └── ExampleTest.php
```

### phpunit.xml設定ポイント

```xml
<php>
    <env name="APP_ENV" value="testing"/>
    <env name="CACHE_STORE" value="array"/>
    <env name="DB_CONNECTION" value="sqlite"/>
    <env name="DB_DATABASE" value=":memory:"/>
    <env name="SESSION_DRIVER" value="array"/>
    <env name="QUEUE_CONNECTION" value="sync"/>
</php>
```

- **DB_CONNECTION=sqlite / DB_DATABASE=:memory:** テスト用にインメモリSQLiteを使用し、本番DBを汚染しない
- **CACHE_STORE=array / SESSION_DRIVER=array**: テスト間の状態分離

## 実行方法

```bash
# Docker経由で実行（推奨）
docker compose run --rm backend php vendor/bin/phpunit

# Composerスクリプト経由
docker compose run --rm backend composer test

# 特定テストスイートのみ
docker compose run --rm backend php vendor/bin/phpunit --testsuite=Unit
docker compose run --rm backend php vendor/bin/phpunit --testsuite=Feature

# 特定テストファイル
docker compose run --rm backend php vendor/bin/phpunit tests/Unit/ExampleTest.php
```

## テストファイルの命名規則

- ファイル名: `*Test.php`
- クラス名: `*Test`
- メソッド名: `test_*` または `@test` アノテーション

## 依存関係（composer.json）

```json
"require-dev": {
    "phpunit/phpunit": "^11.5.3",
    "mockery/mockery": "^1.6",
    "fakerphp/faker": "^1.23"
}
```

- **phpunit**: テストフレームワーク
- **mockery**: モックライブラリ
- **faker**: テストデータ生成

## テスト作成の指針

### Unit テスト

- Laravelの機能（DB、HTTPなど）に依存しないロジックをテスト
- `PHPUnit\Framework\TestCase` を継承

```php
namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class SampleTest extends TestCase
{
    public function test_something(): void
    {
        // Arrange / Act / Assert
    }
}
```

### Feature テスト

- HTTP経由でアプリケーション全体の動作をテスト
- `Tests\TestCase` を継承（Laravelアプリケーションをブート）

```php
namespace Tests\Feature;

use Tests\TestCase;

class ApiTest extends TestCase
{
    public function test_api_returns_success(): void
    {
        $response = $this->get('/api/health');
        $response->assertStatus(200);
    }
}
```

## 意図/理由

- **Laravelデフォルト採用**: 追加設定なしで動作し、ドキュメントも豊富。チーム間での認識統一が容易。
- **インメモリDB**: テストの高速化と本番データの保護を両立。
- **Unit/Feature分離**: テストの目的を明確化し、適切な粒度でのテストを促進。

## フォローアップ

- CI/CDへのテスト統合（GitHub Actions）
- APIエンドポイント（/api/health, /api/profile, /api/works）のFeatureテスト追加
- カバレッジレポートの設定
