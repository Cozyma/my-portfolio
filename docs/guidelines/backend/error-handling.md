---
title: 例外/エラー
description: APIエラーレスポンスと例外処理の方針
tags: [ガイドライン, バックエンド, エラー処理]
---

# 例外/エラー

- エラー応答は `{ code?, message, details? }` を目安に統一。
- 必要に応じて `app/Exceptions/Handler.php` で整形。
- ログはローカルでは既定、Lambda では `LOG_CHANNEL=stderr` を検討。

