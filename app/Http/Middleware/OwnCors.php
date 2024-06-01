<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OwnCors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Daftar domain yang diizinkan
        // $allowedOrigins = ['http://localhost:5173', 'https://iqbalfaris.my.id', 'https://react.iqbalfaris.my.id'];
        $allowedOrigins = ['https://iqbalfaris.my.id'];

        // Periksa apakah Origin diizinkan
        $origin = $request->headers->get('Origin');
        if (in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
            header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization");
            if ($request->getMethod() == "OPTIONS") {
                return response('OK')
                    ->header("Access-Control-Allow-Origin", $origin)
                    ->header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
                    ->header("Access-Control-Allow-Headers", "Content-Type, X-Auth-Token, Origin, Authorization");
            }
        }

        $response = $next($request);

        return $response;
    }
}
