---
title: DI/プロバイダ
description: サービスプロバイダとDIバインドの実装方針
tags: [ガイドライン, バックエンド, DI, プロバイダ]
---

# DI / プロバイダ

- `App\\Providers\\RepositoryServiceProvider` に Interface→実装 のバインドを記述。
- `bootstrap/providers.php` にサービスプロバイダを登録。
- 例）`ProfileRepositoryInterface::class => InMemoryProfileRepository::class`

