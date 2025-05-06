<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Route::get('/news', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/terkini');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Terkini', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/terkini');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Politik', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/politik');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Hukum', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/hukum');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Ekonomi', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/ekonomi');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Olahraga', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/olahraga');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Teknologi', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/tekno');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Hiburan', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/hiburan');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Gaya Hidup', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/lifestyle');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Dunia', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/dunia');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Otomotif', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/otomotif');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/news/Top News', function () {
    try {
        $response = Http::get('https://berita-indo-api-next.vercel.app/api/antara-news/top-news');
        
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to fetch news'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::post('/login', function (Request $request) {
    try {
        $response = Http::post('localhost:9010/admin/login', [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to authenticate'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::post('/register', function (Request $request) {
    try {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post('localhost:9010/admin/register', [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
        ]);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Failed to register user'], $response->status());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::post('/verify-token', function (Request $request) {
    $token = $request->input('token');

    if (!$token) {
        return response()->json(['valid' => false, 'error' => 'Token is required'], 400);
    }

    try {
        $decoded = JWT::decode($token, new Key('secret_key', 'HS256'));
        return response()->json(['valid' => true, 'user' => $decoded]);
    } catch (\Exception $e) {
        return response()->json(['valid' => false, 'error' => 'Invalid token'], 401);
    }
});