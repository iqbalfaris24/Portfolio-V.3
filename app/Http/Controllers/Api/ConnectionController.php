<?php

namespace App\Http\Controllers\Api;

use App\Models\Connection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ConnectionController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'profileImage' => 'mimes:jpeg,png,jpg,gif|max:10240',
            'name' => 'required',
            'message' => 'required|max:250',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $profileImage = $request->file('profileImage');
        $profileImagePath = null;

        if ($profileImage) {
            $profileImagePath = $profileImage->store('document', 'public');
        }

        $connection = Connection::create([
            'profileImage' => $profileImagePath,
            'name' => $request->input('name'),
            'message' => $request->input('message'),
            'socialMedia' => json_encode($request->input('socialMedia')),
        ]);

        return response()->json(['connection' => $connection], 200);
    }

    public function index()
    {
        $connection = Connection::orderBy('created_at', 'desc')->get();
        return response()->json(['connection' => $connection], 200);
    }

    public function destroy($id)
    {
        $connection = Connection::findOrFail($id);
        if ($connection->profileImage) {
            Storage::delete($connection->profileImage);
        }
        $connection->delete();

        return response()->json(['message' => 'Connection deleted successfully'], 200);
    }
}
