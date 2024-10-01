<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\ContactInfoController;
use App\Http\Controllers\Admin\PageHomeController;
use App\Http\Controllers\Admin\PoliciesController;

Route::namespace("Admin")->group(function () {
    Route::prefix('content-adm')->group(function () {
        Route::get('/', [LoginController::class, 'login'])->name('admin.login');

        Route::controller(LoginController::class)->group(function(){
            Route::post('/sendAdminLogin', 'authentication')->name("admin.sendLogin");
            Route::post('/sendAdminLogout', 'logout')->name("admin.sendLogout");
        });

        Route::middleware('auth.admin')->group(function () {
            Route::prefix('dashboard')->group(function () {
                Route::get('/', [DashboardController::class, 'dashboard'])->name('admin.dashboard');

                // Usuários Gestores
                Route::controller(AdminController::class)->prefix('admins')->group(function () {
                    Route::get('/', 'index')->name('admin.admins.index');
                    Route::get('/formulario/{id?}', 'form')->name('admin.admins.form');

                    Route::post('/submit', 'post')->name('admin.admins.submit');
                    Route::put('/remove', 'remove')->name('admin.admins.remove');
                });

                // Informações de Contato
                Route::controller(ContactInfoController::class)->prefix('informacoes-de-contato')->group(function () {
                    Route::get('/', 'index')->name('admin.contact_info.index');
                    Route::post('/submit', 'post')->name('admin.contact_info.submit');
                });

                // Página Home
                Route::controller(PageHomeController::class)->prefix('pagina-home')->group(function () {
                    Route::get('/', 'index')->name('admin.page_home.index');
                    Route::post('/formPageHome', 'post')->name('admin.page_home.submit');
                });

                // Políticas e Termos
                Route::controller(PoliciesController::class)->group(function () {
                    Route::get('/politica-de-cookies', 'cookies')->name('admin.policies.cookies');
                    Route::get('/politica-de-privacidade', 'privacy')->name('admin.policies.privacy');
                    Route::get('/termos-de-uso', 'terms')->name('admin.policies.terms');

                    Route::post('/formPolicies', 'post')->name('admin.policies.submit');
                });

                // Banners
                Route::controller(BannerController::class)->prefix('banners')->group(function () {
                    Route::get('/', 'index')->name('admin.banners.index');
                    Route::get('/formulario/{id?}', 'form')->name('admin.banners.form');

                    Route::post('/submit', 'post')->name('admin.banners.submit');
                    Route::put('/remove', 'remove')->name('admin.banners.remove');
                });
                
            });
        });
    });
});
