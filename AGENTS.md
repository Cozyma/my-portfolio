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

コミットメッセージ方針（日本語）
- コミットタイトル/本文は日本語を基本とします。必要な技術用語は英語のままで構いません。
- 可能であれば Conventional Commits の接頭辞は維持し、説明は日本語にします。
  - 例: `feat: 連絡先フォームの送信処理を追加`
  - 例: `chore: 依存更新とビルド設定の整理`
- 変更は最小限・局所的の原則に沿い、コミット粒度も小さく保ってください。

実装ガイドライン（バックエンド）
- レイヤード構成を厳密に維持: Controller → Service → Repository（Interface 経由で DI）。
- Repository は `App\Repositories\<Domain>RepositoryInterface` を定義し、実装は `App\Repositories\InMemory\...` などインフラ層名空間に配置。
- Service はユースケースロジックのみを担い、I/O (Request/Response) を扱わない。
- Controller は入出力とバリデーションのみに責務を限定。返却は Laravel Resource で `{ data, meta? }` を基本形とする。
- ルーティングは v0 では `routes/web.php` に `Route::prefix('api')` 配下で定義（将来 `api.php` に分離可）。
- DI 設定は `App\Providers\RepositoryServiceProvider` に記述し、`bootstrap/providers.php` に登録。
- エラー形式は `{ code?, message, details? }` を目安に統一（必要時 Exception→Handler で整形）。
- 環境依存は `.env` を使用（例: `LOG_CHANNEL=stderr` は Lambda で有用）。ローカル権限は Compose により自動調整済み。
- テストは Feature（疎通）を最小から追加（`/api/*`, `/api/health`）。

実装ガイドライン（フロントエンド）
- ディレクトリ構成（推奨）
  - `src/app/`（レイアウト/プロバイダ）、`src/pages/`（画面単位）、`src/components/`（再利用 UI）、`src/lib/`（API/Util）、`src/hooks/`、`src/assets/`、`src/styles/`。
- API クライアントは `src/lib/api.ts` を統一窓口とし、`VITE_API_BASE_URL` で切替。返却は API の `{data}` をデフォルトで unwrap。
- UI は Tailwind + DaisyUI を基本。複雑 UI は shadcn/ui を段階導入。テーマは `data-theme` 切替。
- 状態管理は v0 ではローカル State/簡易フックで十分。必要に応じて段階的にライブラリ導入を検討。
- コンポーネント命名は PascalCase。ページも PascalCase（例: `Home.jsx`）。
- 環境変数は `.env`（ローカル）と GitHub Actions の `vars` を使用し、CI では `VITE_API_BASE_URL` を注入。

運用メモ
- 重要な構成変更は `docs/decisions/` に短く記録し、この AGENTS.md と一貫性を保つ。
- ローカル検証: `curl http://localhost:8080/api/health` で疎通、フロントは `frontend/.env` の `VITE_API_BASE_URL` を確認。

詳細ガイドライン（常時参照先）
- バックエンド: `docs/guidelines/backend/README.md`（章立てに分割）
- フロントエンド: `docs/guidelines/frontend/README.md`（章立てに分割）

分量が増えた場合の分割方針
- ガイドラインは `docs/guidelines/` 配下で細分化します（既に backend/ と frontend/ に分割済み）。
- さらに章の増加や詳細化が必要になれば、サブディレクトリで細分化してください（例: `docs/guidelines/backend/errors/`）。
