<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login()
    {
        if (Auth::guard(getAdminGuard())->check()) {
            return to_route('admin.dashboard');
        }

        $content = getSeoSimple('Login', 'CMS UEEK');

        return Inertia::render('admin/login/page', compact(['content']))
            ->withViewData(['title' => $content->seoTitle, 'description' => $content->seoDescription]);
    }

    public function authentication(Request $request)
    {
        $credentials = ['email' => $request->email, 'password' => $request->password, 'status' => 1];
        if (!Auth::guard(getAdminGuard())->attempt($credentials) && !Auth::guard(getAdminGuard())->attempt($credentials)) {
            return response()->json([
                'status' => 0,
                'error' => 'Credenciais incorretas',
            ], 401);
        }

        return response()->json([
            'status' => 1,
        ], 200);
    }

    public function logout(Request $request)
    {
        Auth::guard(getAdminGuard())->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('admin.login');
    }
}
