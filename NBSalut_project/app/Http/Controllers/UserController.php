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

    public function getUsers()
    {
        $data = User::orderBy('num_clinical_log', 'DESC')->get();
        return $data;
    }

    public function getPatients()
    {
        $data = User::where('role', 'patient')->orderBy('num_clinical_log', 'DESC')->get();
        return $data;
    }

    public function getWorkers()
    {
        $data = User::where('role', 'admin')->orWhere('role', 'specialist')->orderBy('register_date', 'DESC')->get();

        return $data;
    }

    public function getMaxClinicalLog()
    {
        $data = User::where('role', 'patient')->max('num_clinical_log');
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

                //Validate unique email
                $usersEmail = User::where('email', $request->email)->get();

                error_log(count($usersEmail));
                if (count($usersEmail) > 0) {
                    return response()->json(['success' =>  false, 'message' => '(Email duplicado)']);
                }
        
                //Validate unique dni
                $usersDni = User::where('dni', $request->dni)->get();
        
                error_log(count($usersDni));
                if (count($usersDni) > 0) {
                    return response()->json(['success' =>  false, 'message' => '(NIF o NIE duplicado)']);
                }

        $success = $patient->save();

        return response()->json(['success' =>  $success, 'user' => $patient]);
    }

    /**
     * Method to add a new worker
     *
     * @param Request $request
     * @return void
     */
    public function addWorker(Request $request)
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

        //Validate unique email
        $usersEmail = User::where('email', $request->email)->get();

        error_log(count($usersEmail));
        if (count($usersEmail) > 0) {
            return response()->json(['success' =>  false, 'message' => '(Email duplicado)']);
        }

        //Validate unique dni
        $usersDni = User::where('dni', $request->dni)->get();

        error_log(count($usersDni));
        if (count($usersDni) > 0) {
            return response()->json(['success' =>  false, 'message' => '(NIF o NIE duplicado)']);
        }
        //Validate unique collegiate number
        $usersColNum = User::where('collegiate_num', $request->collegiate_num)->get();

        error_log(count($usersColNum));
        if (count($usersColNum) > 0) {
            return response()->json(['success' =>  false, 'message' => '(Número de colegiado duplicado)']);
        }


        $success = $patient->save();

        return response()->json(['success' =>  $success, 'user' => $patient]);
    }


    public function updateUser(Request $request)
    {
        $user = User::find($request->id);
        error_log($user);
        //$user->id = $request->id;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        //$user->password = $request->password;
        $user->dni = $request->dni;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->birthdate = date('Y-m-d', strtotime($request->birthdate));
        $user->city = $request->city;
        $user->address = $request->address;
        $user->postal_code = $request->postal_code;
        $user->active = $request->active;
        $user->previous_pathologies = $request->previous_pathologies;
        $user->diabetic = $request->diabetic;
        $user->ss_CIP = $request->ss_CIP;
        $user->center_code = $request->center_code;
        $user->num_clinical_log = $request->num_clinical_log;
        $user->collegiate_num = $request->collegiate_num;
        $user->role = $request->role;
        //??date('Y-m-d', strtotime($request->register_date));
        $user->register_date = date('Y-m-d', strtotime($request->register_date));
        $success = $user->update();
        error_log($user);
        return response()->json(['success' => $success, 'user' => $user]);
    }



    public function deactivateUser(Request $request)
    {
        $user = User::find($request->id);
        $user->active = $request->active;

        $success = $user->update();
        error_log($user);
        return response()->json(['success' => $success, 'user' => $user]);
    }


    public function deleteUser(Request $request)
    {
        error_log($request->id);
        $result = User::destroy($request->id);

        //$deletedUser = User::find($request->id);
        //$deletedUser->delete();

        return response()->json(['success' => $result]);
    }
}
