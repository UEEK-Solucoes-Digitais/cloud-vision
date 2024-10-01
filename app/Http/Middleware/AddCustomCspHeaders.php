<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddCustomCspHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // $csp = "default-src 'self'; script-src 'self'";
        // $response->headers->set('Content-Security-Policy', $csp);

        // $csp = "default-src 'self';" .
        //     "script-src 'self' 'unsafe-inline' ws://localhost:5173/ ws://bigjohncervejaria.ueek.dev/ http://localhost:5173;" .
        //     "style-src 'self' 'unsafe-inline' fonts.googleapis.com http://localhost:5173;" .
        //     "img-src 'self' data:;" .
        //     "connect-src 'self' ws://localhost:5173/;" .
        //     // "connect-src 'self' ws://bigjohncervejaria.ueek.dev/;" .
        //     "font-src 'self' fonts.gstatic.com http://localhost:5173 data:;";

        // $response->headers->set('Content-Security-Policy-Report-Only', $csp);

        // TODO: Verificar politica

        return $response;
    }
}
