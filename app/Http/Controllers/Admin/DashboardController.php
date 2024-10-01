<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $content = getSeoSimple('Dashboard', 'CMS UEEK');

        return Inertia::render('admin/dashboard/page', compact(['content']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }
}
