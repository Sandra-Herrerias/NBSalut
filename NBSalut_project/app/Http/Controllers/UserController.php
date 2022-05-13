<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Hash;


use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false]);
        }
        // $user= Auth::loginUsingId($user->id);
        return response()->json(['success' => true, 'user' => $user]);
    }

    public function checkPatient(Request $request) {
        $patient = User::where('dni', $request->dni)->first();
        if (!$patient) {
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true, 'user' => $patient]);
    }
<<<<<<< HEAD


    public function getUser(Request $request){ 
        $data = User::all();
        return $data;
    }
}
=======
}
>>>>>>> 5ece76eb1b1adf5e7017ea8728664ad5207081fb
