---
title: フロントエンドテスト環境構築（Playwright + Vitest）
description: E2Eテスト（Playwright）とユニットテスト（Vitest）の導入経緯と構成
tags: [ADR, テスト, フロントエンド, Playwright, Vitest]
---

# フロントエンドテスト環境構築（2026-01-28）

## 概要

フロントエンドのテスト環境を構築。E2Eテスト（Playwright）でユーザーフローを検証し、ユニットテスト（Vitest）でコンポーネントの個別動作を担保する二層構成を採用。

## テスト戦略

| レイヤー | ツール | 目的 | 対象 |
|---------|--------|------|------|
| E2E | Playwright | ユーザーフローの検証 | ページ遷移、フォーム操作、UIの可視性 |
| Unit | Vitest + Testing Library | 個別コンポーネントの動作検証 | コンポーネント、ロジック、状態管理 |

## 導入内容

### 1. Playwright（E2Eテスト）

**追加ファイル（プロジェクトルート）**:
- `package.json` - Playwright依存関係とスクリプト
- `playwright.config.js` - Playwright設定
- `tests/e2e/home.spec.js` - サンプルテスト

**設定ポイント**:
```javascript
// playwright.config.js
module.exports = defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5373',
    headless: true,
    browserName: 'chromium',
    chromiumSandbox: false,  // Docker/CI環境向け
  },
});
```

**実行方法**:
```bash
# プロジェクトルートで
npm run test:e2e

# UIモード
npx playwright test --ui
```

**注意**: ベースURLは `localhost:5373`（docker-compose.ymlのポートマッピング `5373:5173` に対応）

### 2. Vitest（ユニットテスト）

**追加ファイル（frontend/）**:
- `vitest.config.js` - Vitest設定
- `src/__tests__/setup.js` - テストセットアップ（jest-dom）
- `src/components/cards/WorkCard.test.jsx` - サンプルテスト

**依存関係**:
- `vitest` - テストランナー
- `@testing-library/react` - Reactコンポーネントテスト
- `@testing-library/jest-dom` - DOM マッチャー拡張
- `jsdom` - ブラウザ環境シミュレーション

**設定ポイント**:
```javascript
// vitest.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
});
```

**実行方法**:
```bash
cd frontend

# watchモード
yarn test

# 1回実行
yarn test:run

# カバレッジ付き
yarn test:coverage
```

## ディレクトリ構成

```
my-portfolio/
├── package.json              # Playwright用
├── playwright.config.js      # E2E設定
├── tests/
│   └── e2e/
│       └── home.spec.js      # E2Eテスト
└── frontend/
    ├── vitest.config.js      # Unit設定
    └── src/
        ├── __tests__/
        │   └── setup.js      # テストセットアップ
        └── components/
            └── cards/
                ├── WorkCard.jsx
                └── WorkCard.test.jsx  # テストはコンポーネント隣接
```

## テストファイルの命名規則

- E2E: `tests/e2e/*.spec.js`
- Unit: `src/**/*.test.jsx` または `src/**/*.spec.jsx`

## .gitignore追加項目

```
# Playwright
/playwright-report/
/test-results/
```

## 意図/理由

- **Playwright選定**: Chromium単体でCI/Docker環境でも安定動作。シンプルな設定で導入可能。
- **Vitest選定**: Viteベースのプロジェクトと親和性が高く、高速。React Testing Libraryとの組み合わせが標準的。
- **二層構成**: E2Eでユーザー視点の動作保証、Unitで開発者視点のロジック保証を分離することで、テストの目的を明確化。

## フォローアップ

- CI/CDへのテスト統合（GitHub Actions）
- カバレッジ閾値の設定
- 重要フローのE2Eテスト追加（ページ遷移、API連携など）
