<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HelperComponents extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        foreach (glob(app_path('Helpers') . '/Backend/*.php') as $file) {
            require_once $file;
        }
    }

    public function boot()
    {
        view()->composer('*', function ($view) {
        });
    }
}
