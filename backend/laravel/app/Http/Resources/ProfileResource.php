<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this['name'] ?? null,
            'title' => $this['title'] ?? null,
            'bio' => $this['bio'] ?? null,
            'socials' => $this['socials'] ?? [],
        ];
    }
}

