<?php

namespace App\Http\Middleware;


class Auth
{
    public function handle($request, \Closure $next, $guard = null)
    {
        if (!\Illuminate\Support\Facades\Auth::guard(getDefaultGuard())->check()) {
            return redirect()->route('dashboard.login');
        }

        return $next($request);
    }
}
