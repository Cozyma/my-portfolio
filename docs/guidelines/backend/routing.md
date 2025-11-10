# ルーティング

- v0 では `routes/web.php` に `Route::prefix('api')` 配下で API を定義。
- 将来的に `routes/api.php` 分離可。CloudFront/CORS と整合させる。
- ヘルスチェックは `/api/health`（200 OK / JSON）。

