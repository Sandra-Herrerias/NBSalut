<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
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

    public function checkPatientDni(Request $request)
    {
        $patient = User::where('dni', $request->dni)->first();
        if (!$patient) {
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true, 'user' => $patient]);
    }

    public function checkPatientName(Request $request)
    {
        $patient = User::where('first_name', $request->name)->where('last_name', $request->surname)->first();
        if (!$patient) {
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true, 'user' => $patient]);
    }

    public function getUser(Request $request)
    {
        $data = User::all();
        return $data;
    }
    
    /**
     * Method to add a new patient
     *
     * @param Request $request
     * @return void
     */
    public function addPatient(Request $request)
    {
        $patient = new User;
        $patient->id;
        $patient->first_name = $request->first_name;
        $patient->last_name = $request->last_name;
        $patient->password = $request->password;
        $patient->dni = $request->dni;
        $patient->email = $request->email;
        $patient->phone = $request->phone;
        $patient->birthdate = date('Y-m-d', strtotime($request->birthdate));
        $patient->city = $request->city;
        $patient->address = $request->address;
        $patient->postal_code = $request->postal_code;
        $patient->active = $request->active;
        $patient->previous_pathologies = $request->previous_pathologies;
        $patient->diabetic = $request->diabetic;
        $patient->ss_CIP = $request->ss_CIP;
        $patient->center_code = $request->center_code;
        $patient->num_clinical_log = $request->num_clinical_log;
        $patient->collegiate_num = $request->collegiate_num;
        $patient->role = $request->role;
        error_log($patient->first_name);
        error_log($patient->dni);
        error_log($patient->phone);
        error_log($patient->address);
        error_log($patient->previous_pathologies);
        error_log($patient->birthdate);
        $patient->save();
        /*
        if (Auth::user()->role == 'admin') {
            return redirect()->route('admin_comments', $comment);
        } else {
            return redirect()->route('comments', $comment);
        }*/
        return response()->json(['success' => true, 'user' => $patient]);
    }
}
