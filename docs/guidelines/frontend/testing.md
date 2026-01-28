---
title: テスト（フロント）
description: フロントエンドのテスト方針と構成
tags: [ガイドライン, フロントエンド, テスト, Playwright, Vitest]
---

# テスト（フロント）

目的: クリティカルな UI/ロジックの regression を防止。

## テスト構成

| レイヤー | ツール | 目的 | 配置 |
|---------|--------|------|------|
| E2E | Playwright | ユーザーフロー検証 | `tests/e2e/*.spec.js`（ルート） |
| Unit | Vitest + Testing Library | 個別動作検証 | `src/**/*.test.jsx`（コンポーネント隣接） |

## 実行コマンド

```bash
# E2E（プロジェクトルート）
npm run test:e2e

# Unit（frontend/）
yarn test        # watchモード
yarn test:run    # 1回実行
```

## テスト対象の指針

### E2E（Playwright）
- ページの表示・遷移
- フォーム送信フロー
- 重要なUIの可視性

### Unit（Vitest）
- コンポーネントのレンダリング
- props/stateによる表示切り替え
- イベントハンドラの動作
- APIクライアントのエラーハンドリング

## 設定ファイル

- E2E: `/playwright.config.js`
- Unit: `/frontend/vitest.config.js`

## 参考

詳細な導入経緯: `docs/decisions/2026-01-28-frontend-testing-environment.md`

