<?php

namespace App\Http\Controllers;
use App\Models\User; 

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request){ 
        $user = User::where('email', $request->_email)->first();
        if(!$user || !Hash::check($request->_password, $user->password)){
            return response()->json(['success' =>false ]);
        }
        else{
            $user=   Auth::loginUsingId($user->id);
            return response()->json(['success' =>true, 'user' => $user ]);
        }

    }
}
