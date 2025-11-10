<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProfileResource;
use App\Services\ProfileService;
use Illuminate\Routing\Controller as BaseController;

class ProfileController extends BaseController
{
    public function __construct(private ProfileService $service)
    {
    }

    public function show(): ProfileResource
    {
        $profile = $this->service->get();
        return new ProfileResource($profile);
    }
}

