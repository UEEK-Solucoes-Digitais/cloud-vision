<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Inertia\Inertia;
use Tightenco\Ziggy\Ziggy;

use App\Models\ContactInfo;
use App\Models\Service;
use App\Models\Product;
use App\Models\ProductCategory;

use Closure;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            ...parent::share($request),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }

    public function handle($request, Closure $next)
    {
        // Inertia::share('contactInfo', ContactInfo::first());

        $response = $next($request);

        if ($request->header('X-Inertia')) {
            $response->headers->set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
            $response->headers->set('Vary', 'Accept');
        }

        return $response;
    }
}
