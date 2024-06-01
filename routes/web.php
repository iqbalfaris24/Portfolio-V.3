<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/create-symlink', function () {
    $targetFolder = base_path('storage/app/public');
    $linkFolder = public_path('storage');

    if (!file_exists($linkFolder)) {
        symlink($targetFolder, $linkFolder);
        return "Symlink created successfully!";
    } else {
        return "Symlink already exists.";
    }
});

Route::get('/clear-cache', function () {
    Artisan::call('optimize:clear');
    return "Cache cleared successfully";
});
