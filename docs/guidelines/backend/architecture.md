---
title: アーキテクチャ（Layered）
description: Controller → Service → Repositoryのレイヤード構成方針
tags: [ガイドライン, バックエンド, アーキテクチャ]
---

# アーキテクチャ（Layered）

- レイヤー: Controller → Service → Repository（Interface 経由で DI）
- Controller: 入出力とバリデーションのみ。返却は Laravel Resource で `{ data, meta? }`。
- Service: ユースケースロジックのみ。I/O を扱わない。
- Repository: `App\\Repositories\\<Domain>RepositoryInterface` を定義。実装は `App\\Repositories\\InMemory\\...` などインフラ層。
- 初期は InMemory 実装で開始し、将来 DB/外部 API 実装に差し替え。

