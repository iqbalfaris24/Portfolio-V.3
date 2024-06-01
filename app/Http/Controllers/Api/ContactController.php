<?php

namespace App\Http\Controllers\Api;

use App\Models\Contact;
use App\Notifications\EmailNotification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phoneNumber' => 'required',
            'message' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $Contact = Contact::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phoneNumber' => $request->input('phoneNumber'),
            'message' => $request->input('message'),
        ]);
        $Condition = 'Contact';
        $Notification = new EmailNotification($Contact, $Condition);
        // Gunakan sendToNotifiable untuk mengirim notifikasi ke objek notifiable
        Notification::send($Contact, $Notification);
        return response()->json(['Contact' => $Contact], 200);
    }

    public function index()
    {
        $Contact = Contact::get();
        return response()->json(['Contact' => $Contact], 200);
    }

    public function destroy($id)
    {
        $Contact = Contact::findOrFail($id);
        $Contact->delete();

        return response()->json(['message' => 'Contact deleted successfully'], 200);
    }
}
