このリポジトリでは、エージェント向けの簡易ガイドとして AGENTS.md を用います。詳細は `docs/decisions/` を参照してください。

- 対象範囲: リポジトリ全体
- 方針: 変更は最小限・局所的に。目的に直結する小さな差分を優先
- まず見る場所:
  - `docs/decisions/`: 重要な変更点・判断理由の記録
  - `README.md`: ローカルセットアップ、ポート、日常的なコマンド

現在の基礎構成/フロントUI方針に関するドキュメント
- Tailwind + Vite の導入、バックエンドコンテナ（Nginx + PHP-FPM）構成、README 更新内容は以下にまとめています。
  - `docs/decisions/2025-11-09-initial-setup-and-tailwind.md`
- フロントエンド UI 方針（DaisyUI + shadcn/ui の折衷）は以下にまとめています。
  - `docs/decisions/2025-11-09-ui-strategy-daisyui-and-shadcn.md`

貢献ルール（メモ）
- 構成やツールに関する重要な変更を行った際は、`docs/decisions/` に短い記録を追加し、PR/コミットから参照してください。
- 秘密情報やマシン固有のファイルはコミットしないでください（`.gitignore` 参照）。

コミュニケーション方針
- このリポジトリでのエージェント対話は、原則として常に日本語で行ってください。
