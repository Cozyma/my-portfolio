# API クライアント

- `src/lib/api.ts` を統一窓口にし、`VITE_API_BASE_URL` で切替。
- 返却は API の `{data}` をデフォルトで unwrap。
- 失敗時は `Error(message)` を投げ、UI 側で表示。

