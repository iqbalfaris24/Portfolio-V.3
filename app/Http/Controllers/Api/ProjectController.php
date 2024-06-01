<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $project = Project::get();
        return response()->json(['project' => $project], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'thumbnail' => 'required|mimes:jpeg,png,jpg,gif',
            'title' => 'required',
            'description' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $project = Project::create([
            'thumbnail' => $request->file('thumbnail')->store('document', 'public'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'linkGithub' => $request->input('linkGithub'),
            'linkWebsite' => $request->input('linkWebsite'),
        ]);
        return response()->json(['project' => $project], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);
        $data = [
            'title' => $request->input('title') ?? $project->title,
            'description' => $request->input('description') ?? $project->description,
            'linkGithub' => $request->input('linkGithub') ?? $project->linkGithub,
            'linkWebsite' => $request->input('linkWebsite') ?? $project->linkWebsite,
        ];

        if ($request->file('thumbnail')) {
            // Hapus file lama sebelum menyimpan yang baru
            if ($project->thumbnail) {
                Storage::delete($project->thumbnail);
            }
            // Simpan file baru
            $data['thumbnail'] = $request->file('thumbnail')->store();
        }
        $project->fill($data);
        $project->save();
        return response()->json(['project', $project], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);
        Storage::delete($project->thumbnail);
        $project->delete();

        return response()->json(['message' => 'Connection deleted successfully'], 200);

    }
}
