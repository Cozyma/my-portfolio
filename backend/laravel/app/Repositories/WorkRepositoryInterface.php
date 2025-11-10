<?php

namespace App\Repositories;

interface WorkRepositoryInterface
{
    /** @return array<int, array> */
    public function listWorks(): array;
}

