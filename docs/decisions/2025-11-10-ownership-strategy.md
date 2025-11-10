# 2025-11-10: Ownership Strategy for Local Dev & Codex CLI

目的: コンテナ実行で生成されるファイルの root 所有を防ぎ、CodexCLI/開発者が編集しやすい所有権を維持する。

決定:
- Docker Compose の `frontend`/`backend` に `user: "${HOST_UID:-1000}:${HOST_GID:-1000}"` を設定
- ルートに `.env.example` を追加し、`HOST_UID/HOST_GID` を指定
- 既存の root 所有を一括修正するため、`scripts/fix-ownership.sh` を追加（`sudo` を使用）

運用:
1) 初回に `.env.example` を `.env` としてコピーし、実ユーザーの UID/GID に合わせて編集
2) 既存の root 所有がある場合は `bash scripts/fix-ownership.sh backend/laravel frontend` を実行
3) 以降はコンテナ内での生成物もホストユーザー所有となる

備考:
- `nginx` はリードオンリーマウントのため `user` 設定は不要
- ホストにより UID/GID は異なるため `.env` で上書き可能にした

