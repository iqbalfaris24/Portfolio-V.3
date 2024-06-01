<?php

namespace App\Http\Controllers\Api;

use App\Models\Biodata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class BiodataController extends Controller
{
    public function store(Request $request)
    {
        $biodata = Biodata::create([
            'profileImage' => $request->file('profileImage')->store('document', 'public'),
            'biodata' => $request->input('biodata'),
            'curiculumVitae' => $request->file('curiculumVitae')->store('document', 'public'),
            'socialMedia' => json_decode($request->input('socialMedia'))
        ]);

        return response()->json(['profile' => $biodata], 200);
    }
    public function index()
    {
        $biodata = Biodata::first();
        return response()->json(['profile' => $biodata], 200);
    }

    public function create()
    {
        // Implementasi untuk menampilkan formulir pembuatan biodata
    }

    public function show($id)
    {
        // Implementasi untuk menampilkan biodata dengan ID tertentu
    }

    public function edit($id)
    {
        // Implementasi untuk menampilkan formulir edit biodata
    }

    public function update(Request $request, $id)
    {
        $biodata = Biodata::findOrFail($id);
        try {
            DB::beginTransaction();
            $data = [
                'biodata' => $request->input('biodata') ?? $biodata->biodata,
                'socialMedia' => json_encode($request->input('socialMedia') ?? $biodata->socialMedia)
            ];

            // Cek apakah file profileImage ada pada request
            if ($request->hasFile('profileImage')) {
                // Hapus file lama sebelum menyimpan yang baru
                if ($biodata->profileImage) {
                    Storage::delete($biodata->profileImage);
                }
                // Simpan file baru
                $data['profileImage'] = $request->file('profileImage')->store('document', 'public');
            }

            // Cek apakah file curiculumVitae ada pada request
            if ($request->hasFile('curiculumVitae')) {
                // Hapus file lama sebelum menyimpan yang baru
                if ($biodata->curiculumVitae) {
                    Storage::delete($biodata->curiculumVitae);
                }
                // Simpan file baru
                $data['curiculumVitae'] = $request->file('curiculumVitae')->store('document', 'public');
            }

            // Simpan data ke model Biodata
            $biodata->fill($data);
            $biodata->save();
            DB::commit();
            return response()->json(['profile' => $biodata], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e], 200);
        }
    }
}
