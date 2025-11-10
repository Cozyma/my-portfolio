<?php

namespace App\Repositories\InMemory;

use App\Repositories\ProfileRepositoryInterface;

class InMemoryProfileRepository implements ProfileRepositoryInterface
{
    public function getProfile(): array
    {
        return [
            'name' => 'Your Name',
            'title' => 'Full-stack Developer',
            'bio' => 'モダンなフロントエンドとサーバーレスを中心に開発しています。',
            'socials' => [
                ['type' => 'github', 'url' => 'https://github.com/yourname'],
                ['type' => 'x', 'url' => 'https://x.com/yourname'],
            ],
        ];
    }
}

