<?php

namespace App\Http\Controllers;
use App\Models\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;
use Illuminate\Support\Facades\Hash;


use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request){ 
        $user = User::where('email', $request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['success' =>false ]);
        }
// return $user;
            // $user= Auth::loginUsingId($user->id);
            return response()->json(['success' =>true, 'user' => $user ]);

    }


    public function getUser(Request $request){ 
        $data = User::all();
        return $data;
    }
}