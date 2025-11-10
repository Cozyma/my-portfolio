<?php

namespace App\Services;

use App\Repositories\WorkRepositoryInterface;

class WorkService
{
    public function __construct(private WorkRepositoryInterface $works)
    {
    }

    /** @return array<int, array> */
    public function list(): array
    {
        return $this->works->listWorks();
    }
}

