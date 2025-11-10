# 契約 / OpenAPI

目的: API 契約を明文化し、フロント/バック間の合意を維持する。

基本方針
- スキーマは `backend/laravel/public/openapi.yaml` に配置（リポジトリ内にバージョン管理）。
- v0 は必須エンドポイントのみ（/api/health, /api/profile, /api/works）を定義。
- 変更時は PR で差分を確認し、docs/decisions に簡易記録。

管理と検証
- ローカル検証: `npx @redocly/cli lint backend/laravel/public/openapi.yaml` 等（導入は任意）。
- CI 導入は後日検討。まずは手動での整合確認を徹底。

契約テスト（最小）
- PHPUnit/Pest の Feature テストで、レスポンス構造（必須フィールドの存在）を検証。
- 将来的にスナップショット/JSON Schema バリデーションを追加可能（`opis/json-schema` など）。

命名・バージョニング
- `info.version` は API の表現レベルで管理（例: 0.1.0）。破壊的変更時にメジャー更新。

