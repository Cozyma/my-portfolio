<?php

namespace App\Providers;

use App\Repositories\InMemory\InMemoryProfileRepository;
use App\Repositories\InMemory\InMemoryWorkRepository;
use App\Repositories\ProfileRepositoryInterface;
use App\Repositories\WorkRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(ProfileRepositoryInterface::class, InMemoryProfileRepository::class);
        $this->app->bind(WorkRepositoryInterface::class, InMemoryWorkRepository::class);
    }

    public function boot(): void
    {
        //
    }
}

