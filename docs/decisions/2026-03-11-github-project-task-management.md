---
title: GitHub Issue + Project によるタスク管理基盤の導入
description: 全体開発を見据え、Issue/PRテンプレート・Project同期Actions・運用ドキュメントを整備
tags: [ADR, タスク管理, GitHub Project, GitHub Actions]
---

# GitHub Issue + Project によるタスク管理基盤の導入（2026-03-11）

## 概要

個人開発フェーズから全体開発への移行を見据え、GitHub Issue と Project を中心としたタスク管理基盤を導入した。

## 背景・動機

- 現状はタスク管理の仕組みがなく、Issue/PR の運用ルールも未整備
- 今後のチーム開発・外部コラボレーションに備え、早期にフローを確立したい
- GitHub Project のステータス遷移・ゲートチェック・親子課題管理を活用し、開発プロセスを標準化する

## 決定事項

### 1. Issue/PR テンプレートの導入

| テンプレート | 用途 |
|---|---|
| task | 実装・調査・運用タスク全般 |
| bug-light | 不具合の一次起票（トリアージ前提） |
| feature-parent | 機能単位の親Issue |
| feature-child-* | 要件/仕様/実装の子Issue |
| PULL_REQUEST_TEMPLATE | 仕様駆動の開発フローに対応したPRテンプレート |

### 2. Project 同期 Actions の導入

- **project_status_sync**: PR/Issue イベントに連動した Project ステータス自動遷移
- **project_parent_sync**: 親子課題のステータス同期（日次スケジュール）
- デフォルト org は `Cozyma`、Project 番号はリポの Variables (`PROJECT_NUMBER`) で設定

### 3. ステータスフロー

```
Backlog → Ready → In progress → In review → Approved → Staging / Merged to Release → Done
```

遷移時にゲートチェック（Milestone設定・完了条件記載・PR存在確認等）を自動実行し、運用品質を担保する。

## TODO

- [ ] Cozyma org で GitHub Project を作成
- [ ] リポの Settings > Secrets and variables > Actions に `PROJECT_AUTOMATION_TOKEN`（Secret）と `PROJECT_NUMBER`（Variable）を設定
- [ ] Project 作成後にワークフローの動作確認
