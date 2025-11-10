# フロントエンド実装ガイドライン

目的: 小さく始めて拡張しやすい構成を採用し、責務分離を明確にする。

ディレクトリ構成（推奨）
- `src/app/`: レイアウト/プロバイダ等のアプリ骨格
- `src/pages/`: 画面単位（Home, Works, Contact など）
- `src/components/`: 再利用 UI（レイアウト、カード、フォーム部品など）
- `src/lib/`: API クライアントやユーティリティ（例: `api.ts`）
- `src/hooks/`: カスタムフック（必要時）
- `src/assets/`: 画像等のアセット
- `src/styles/`: スタイル関連（必要時）

基本原則
- API クライアントは `src/lib/api.ts` を統一窓口とし、`VITE_API_BASE_URL` で切替。API の `{data}` はデフォルトで unwrap。
- UI は Tailwind + DaisyUI を基本。複雑 UI は必要箇所に限定して shadcn/ui を段階導入。テーマ切替は `data-theme`。
- 状態管理は v0 ではローカル State/簡易フックで十分。必要に応じ段階的にライブラリ導入を検討。
- 命名: コンポーネント/ページは PascalCase（例: `WorkCard.jsx`, `Home.jsx`）。
- 環境変数: ローカルは `frontend/.env`、CI は GitHub Actions の `vars.API_BASE_URL` を `VITE_API_BASE_URL` として注入。

補足
- 画面数や機能が増えたら `src/features/<feature>/` で Co-location（UI/ロジック/スタイル/テスト）を検討。
- バレル（index.ts）は必要になってから最小限で導入。

