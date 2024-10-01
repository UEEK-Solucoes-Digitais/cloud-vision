<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Site\SiteController;

Route::namespace("Site")->group(function () {
    Route::controller(SiteController::class)->group(function () {
        Route::get('/', 'home')->name('site.home');
        Route::get('/politica-de-cookies', 'policies')->name('site.cookies');
        Route::get('/politica-de-privacidade', 'policies')->name('site.privacy');
        Route::get('/termos-de-uso', 'policies')->name('site.terms');

        Route::post('image-test', 'imageTest')->name('site.testImage');
    });
});
