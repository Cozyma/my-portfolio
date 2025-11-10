# DI / プロバイダ

- `App\\Providers\\RepositoryServiceProvider` に Interface→実装 のバインドを記述。
- `bootstrap/providers.php` にサービスプロバイダを登録。
- 例）`ProfileRepositoryInterface::class => InMemoryProfileRepository::class`

