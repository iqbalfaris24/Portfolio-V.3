<?php

namespace App\Http\Controllers\Api;

use App\Models\Biodata;
use App\Models\Project;
use App\Models\Connection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Biodata = Biodata::first();
        $Project = Project::get();
        $Connection = Connection::get();
        return response()->json([
            'profile' => $Biodata,
            'project' => $Project,
            'connection' => $Connection
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Ganti path dan nama file sesuai dengan penyimpanan Anda
        $Biodata = Biodata::findOrFail($id);
        $filePath = $Biodata->curiculumVitae;
        $fileName = 'Curriculum Vitae - Iqbal Faris Akbar.pdf';
        // Membuat response untuk mengunduh file
        $response = response()->download(storage_path("app/public/{$filePath}"), $fileName, [
            'Content-Disposition' => 'attachment',
        ]);
        // Menghapus cache untuk mencegah file rusak
        ob_end_clean();
        return $response;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
