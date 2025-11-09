# フロントエンド UI 方針（DaisyUI + shadcn/ui 折衷）

目的
- UI 実装の初速と拡張性/品質（アクセシビリティ含む）を両立する。

方針
- 共通UI（ボタン/カード/ナビ/フォーム等）: DaisyUI を Tailwind プラグインとして活用し、テーマ切替も容易にする。
- 高度UI（Dialog/Popover/Combobox/Command など）: shadcn/ui（Radix UI + Tailwind）を段階導入し、A11y/動作品質を担保する。

実装状況
- DaisyUI: 導入済み。
  - `frontend/package.json` に `daisyui` を追加
  - `frontend/tailwind.config.cjs` に `plugins: [require('daisyui')]` と `themes` を設定
  - 初期ページ（`frontend/src/App.jsx`）を DaisyUI の `btn`/`card` とテーマセレクタで構成
- shadcn/ui: 段階導入予定。
  - 必要になった時点で以下依存を追加:
    - `class-variance-authority tailwind-merge @radix-ui/react-dialog @radix-ui/react-popover lucide-react`
  - `src/components/ui/` 配下にコンポーネントを配置（ボタン/ダイアログから開始）
  - Tailwind 設定は現状のままで利用可能。必要なら `tailwindcss-animate` を追加

運用メモ
- DaisyUI テーマ切替: `<html data-theme="light|dark|cupcake">`、または JS で `document.documentElement.setAttribute('data-theme', 'dark')`
- ライブラリ混在時のスタイル一貫性:
  - カラートークンは DaisyUI のテーマを基準に、shadcn 側は Tailwind のユーティリティで揃える
  - 競合したら DaisyUI のユーティリティ（例: `bg-base-100`）を優先し、Radix 側は余計なリセットを避ける

今後の TODO（必要に応じて）
- `src/components/ui/Button.tsx`（cva + tailwind-merge）追加
- Radix Dialog を使ったモーダル実装例の追加
- `prettier-plugin-tailwindcss` 導入（クラス順の自動整列）
