---
title: フロントエンドのファイル分割戦略（v0）
description: 小さく始めて拡張しやすいフロントエンド構成の方針
tags: [ADR, フロントエンド, 構成]
---

# 2025-11-10: フロントエンドのファイル分割戦略（v0）

目的: 小さく始めて拡張しやすい構成を採用し、初期段階から責務分離を明確にする。

## ディレクトリ構成（推奨）
- `src/app/`: アプリ全体の骨格（レイアウト、プロバイダ等）
- `src/pages/`: 画面単位（Home, Works, Contact など）
- `src/components/`: 再利用可能な UI（レイアウト、カード、フォーム部品など）
- `src/lib/`: API クライアントやユーティリティ
- `src/hooks/`: カスタムフック（必要時）
- `src/assets/`: 画像等のアセット
- `src/styles/`: スタイル関連（必要時）

命名規則
- コンポーネント: PascalCase（例: `WorkCard.jsx`, `Header.jsx`）
- ページ: PascalCase（例: `Home.jsx`）
- ライブラリ/ユーティリティ: camelCase or kebab-case（例: `api.ts`）

基本方針
- ページ → コンポーネント → UI 部品の順に分割。まずは Home のみ分割。
- 機能粒度が増えたら `src/features/<feature>/` で Co-location（UI/ロジック/スタイル/テスト）を検討。
- バレル（index.ts）は必要になってから最小限に。

ルーティング
- v0 は単一ページ構成（Router 不要）。複数ページ化のタイミングで React Router を導入。

スタイル
- Tailwind + DaisyUI を基本。高度な UI が必要になった箇所に限定して shadcn/ui を段階導入。

