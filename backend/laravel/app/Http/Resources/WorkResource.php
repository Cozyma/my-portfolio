<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this['id'] ?? null,
            'title' => $this['title'] ?? null,
            'description' => $this['description'] ?? null,
            'url' => $this['url'] ?? null,
            'tags' => $this['tags'] ?? [],
            'createdAt' => $this['createdAt'] ?? null,
        ];
    }
}

