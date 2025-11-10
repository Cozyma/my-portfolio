# 例外/エラー

- エラー応答は `{ code?, message, details? }` を目安に統一。
- 必要に応じて `app/Exceptions/Handler.php` で整形。
- ログはローカルでは既定、Lambda では `LOG_CHANNEL=stderr` を検討。

