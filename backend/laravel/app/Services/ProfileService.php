<?php

namespace App\Services;

use App\Repositories\ProfileRepositoryInterface;

class ProfileService
{
    public function __construct(private ProfileRepositoryInterface $profiles)
    {
    }

    public function get(): array
    {
        return $this->profiles->getProfile();
    }
}

