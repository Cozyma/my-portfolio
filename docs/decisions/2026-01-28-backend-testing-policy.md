---
title: バックエンドテスト方針（DB保全・トランザクション・Seeder）
description: 共有DB環境でのテスト実行におけるDB保全戦略と実装パターン
tags: [ADR, テスト, バックエンド, PHPUnit, トランザクション, Seeder]
---

# バックエンドテスト方針（2026-01-28）

## 概要

開発環境とテスト環境でDBを共有する前提で、テスト実行後もDB状態を完全に保全するための方針を定義。手動トランザクションによる確実なロールバックと、冪等性のあるSeeder設計を採用。

## 基本原則

1. **DB状態の完全保全**: テスト前後でDBは同一状態を維持
2. **手動トランザクション必須**: `DatabaseTransactions` traitは使用禁止
3. **try...finally による確実なロールバック**: 例外発生時も必ずロールバック
4. **Seederの冪等性**: 何度実行しても同一結果

## テストレイヤーの責務

| レイヤー | DB使用 | 主な責務 | カバレッジ |
|---------|--------|----------|-----------|
| **Unit** | なし | ロジック検証 | 主担当（100%目標） |
| **Feature** | あり（ロールバック） | DB連携を含む機能検証 | 補助 |
| **Integration** | あり（ロールバック） | 外部API連携のモック検証 | 補助 |

## 手動トランザクションパターン

### 基本パターン（try...finally）

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class ExampleFeatureTest extends TestCase
{
    private const CONN = 'mysql';

    private function beginTxn(): void
    {
        DB::connection(self::CONN)->beginTransaction();
    }

    private function rollbackTxn(): void
    {
        DB::connection(self::CONN)->rollBack();
    }

    public function test_example_with_database(): void
    {
        $this->beginTxn();
        try {
            // Arrange: テストデータ準備
            $user = User::factory()->create();

            // Act: テスト対象の実行
            $response = $this->getJson('/api/users/' . $user->id);

            // Assert: 結果検証
            $response->assertStatus(200);
        } finally {
            // 必ず実行される（例外発生時も）
            $this->rollbackTxn();
        }
    }
}
```

### setUp/tearDown パターン

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class AnotherFeatureTest extends TestCase
{
    private const CONN = 'mysql';

    protected function setUp(): void
    {
        parent::setUp();
        DB::connection(self::CONN)->beginTransaction();
    }

    protected function tearDown(): void
    {
        DB::connection(self::CONN)->rollBack();
        parent::tearDown();
    }

    public function test_example(): void
    {
        // Arrange / Act / Assert
        // tearDown で自動ロールバック
    }
}
```

## Seeder設計パターン

### パターン1: 存在チェック（upsert型）

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        // 存在しない場合のみ作成
        if (!User::where('email', 'test@example.com')->exists()) {
            User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => bcrypt('password'),
            ]);
        }
    }
}
```

### パターン2: 削除後再作成（リセット型）

```php
<?php

namespace Database\Seeders;

use App\Models\TestData;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        $targetIds = ['test-001', 'test-002', 'test-003'];

        // 対象データを削除（冪等性保証）
        TestData::whereIn('id', $targetIds)->delete();

        // 再作成
        foreach ($targetIds as $id) {
            TestData::create([
                'id' => $id,
                'value' => 'test value',
            ]);
        }
    }
}
```

### Seederの実行（テスト内）

```php
public function test_with_seeder(): void
{
    $this->beginTxn();
    try {
        // Seeder実行（冪等なので複数回実行可能）
        $this->seed(TestDataSeeder::class);

        // テスト実行
        $response = $this->getJson('/api/data');
        $response->assertStatus(200);
    } finally {
        $this->rollbackTxn();
    }
}
```

## テスト記述ルール

### AAAパターン（必須）

```php
public function test_example(): void
{
    // Arrange: 事前準備
    $input = ['name' => 'test'];

    // Act: 実行
    $result = $this->service->process($input);

    // Assert: 検証
    $this->assertEquals('expected', $result);
}
```

### 命名規則

- メソッド名: `test_対象_条件_期待結果`
- 日本語での説明は `#[TestDox]` アトリビュートを使用

```php
use PHPUnit\Framework\Attributes\TestDox;

#[TestDox('ユーザー作成: 有効な入力で成功する')]
public function test_create_user_with_valid_input_succeeds(): void
{
    // ...
}
```

## 禁止事項

| 禁止 | 理由 |
|------|------|
| `DatabaseTransactions` trait | 複数DB接続で信頼性が低い |
| `RefreshDatabase` trait | 本番/開発データを破壊する |
| トランザクションなしのDB操作 | データ汚染の原因 |
| 自動コミットされるSeeder | ロールバック不可 |

## phpunit.xml 設定例

```xml
<php>
    <env name="APP_ENV" value="testing"/>
    <env name="DB_CONNECTION" value="mysql"/>
    <env name="CACHE_STORE" value="array"/>
    <env name="SESSION_DRIVER" value="array"/>
    <env name="QUEUE_CONNECTION" value="sync"/>
</php>
```

## 実行コマンド

```bash
# 全テスト
docker compose run --rm backend php vendor/bin/phpunit

# Unitのみ（推奨：高速）
docker compose run --rm backend php vendor/bin/phpunit --testsuite=Unit

# Featureのみ
docker compose run --rm backend php vendor/bin/phpunit --testsuite=Feature

# カバレッジ付き
docker compose run --rm backend php vendor/bin/phpunit --coverage-html coverage/
```

## 意図/理由

- **手動トランザクション**: Laravelの `DatabaseTransactions` trait は単一接続前提で、複数DB接続環境では信頼性が低い。明示的な制御で確実性を担保。
- **try...finally**: 例外発生時もロールバックを保証し、テスト失敗時のデータ汚染を防止。
- **冪等Seeder**: 開発中に何度実行しても同じ状態を再現でき、CI/CDでも安定動作。

## フォローアップ

- TestCase基底クラスへのトランザクションヘルパー追加
- CI/CDでのテスト自動実行設定
- カバレッジ閾値の設定
