<?php

namespace App\Repositories\InMemory;

use App\Repositories\WorkRepositoryInterface;

class InMemoryWorkRepository implements WorkRepositoryInterface
{
    public function listWorks(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'ポートフォリオサイト',
                'description' => 'React + Laravel(Bref) + AWS Serverless 構成のポートフォリオ。',
                'url' => 'https://example.com/portfolio',
                'tags' => ['React', 'Laravel', 'AWS', 'Serverless'],
                'createdAt' => '2024-10-01',
            ],
            [
                'id' => 2,
                'title' => 'UI コンポーネント集',
                'description' => 'Tailwind + DaisyUI のコンポーネント実装サンプル。',
                'url' => 'https://example.com/ui-kit',
                'tags' => ['Tailwind', 'DaisyUI'],
                'createdAt' => '2024-08-15',
            ],
        ];
    }
}

