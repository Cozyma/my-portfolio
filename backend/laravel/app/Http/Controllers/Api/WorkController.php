<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\WorkResource;
use App\Services\WorkService;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class WorkController extends BaseController
{
    public function __construct(private WorkService $service)
    {
    }

    public function index(): AnonymousResourceCollection
    {
        $works = $this->service->list();
        return WorkResource::collection($works)->additional(['meta' => ['count' => count($works)]]);
    }
}

