---
title: 構成/ディレクトリ
description: フロントエンドのディレクトリ構成と命名規則
tags: [ガイドライン, フロントエンド, 構成]
---

# 構成/ディレクトリ

- `src/app/`: レイアウト/プロバイダ等のアプリ骨格
- `src/pages/`: 画面単位（Home, Works, Contact など）
- `src/components/`: 再利用 UI（レイアウト、カード、フォーム部品など）
- `src/lib/`: API クライアントやユーティリティ（例: `api.ts`）
- `src/hooks/`: カスタムフック（必要時）
- `src/assets/`: 画像等のアセット
- `src/styles/`: スタイル関連（必要時）

命名: コンポーネント/ページは PascalCase。

