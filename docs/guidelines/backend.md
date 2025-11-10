# バックエンド実装ガイドライン

目的: 厳密なレイヤード構成（Controller → Service → Repository）を維持しつつ、最小実装から拡張可能にする。

基本原則
- Controller は入出力（Http/Validation）のみを担当。返却は Laravel Resource で `{ data, meta? }` を基本形に。
- Service はユースケースのロジックに専念し、I/O（Request/Response）は扱わない。
- Repository は `App\\Repositories\\<Domain>RepositoryInterface` を定義し、実装は `App\\Repositories\\InMemory\\...` 等のインフラ層に配置。
- DI 設定は `App\\Providers\\RepositoryServiceProvider` に記述し、`bootstrap/providers.php` に登録。
- ルーティングは v0 では `routes/web.php` の `Route::prefix('api')` 配下に定義（将来 `routes/api.php` に分離可）。
- エラー形式は `{ code?, message, details? }` を目安に統一（必要に応じて ExceptionHandler で整形）。
- 環境依存は `.env` を使用（例: Lambda では `LOG_CHANNEL=stderr` が有用）。
- ローカルの `storage`/`bootstrap/cache` 権限はコンテナ起動時に自動調整（docker-compose.yml）。
- テストは Feature（疎通）から最小限で開始し、必要に応じて拡張。

ディレクトリ目安
- `app/Http/Controllers/Api/*`
- `app/Services/*`
- `app/Repositories/*`（`InMemory/` 実装を初期は採用）
- `app/Http/Resources/*`
- `app/Providers/RepositoryServiceProvider.php`

補足
- 将来的にデータソースが増える場合（DB/外部API）は `Infrastructure` 名空間で実装を追加し、Interface で切替。

