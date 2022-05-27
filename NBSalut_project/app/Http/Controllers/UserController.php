<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
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

        if ($user->active == 0) {
            return response()->json(['success' => false, 'message' => 'Usuario se encuentra desactivado']);
        }

        return response()->json(['success' => true, 'user' => $user]);
    }


    public function getAuthUser()
    {
        if (Auth::user()) {
            return Auth::user();
        }
        return "no user";
    }

    /**
     * Function that
     *
     * @param Request $request
     * @return void
     */
    public function checkPatientDni(Request $request)
    {
        $patient = User::where('dni', $request->dni)->first();
        if (!$patient) {
            return response()->json(['success' => false]);
        }

        if ($patient->active == 0) {
            return response()->json(['success' => false, 'message' => 'Paciente se encuentra desactivado.']);
        }

        return response()->json(['success' => true, 'user' => $patient]);
    }

    public function checkPatientName(Request $request)
    {
        $patient = User::where('first_name', $request->name)->where('last_name', $request->surname)->first();
        if (!$patient) {
            return response()->json(['success' => false]);
        }

        if ($patient->active == 0) {
            return response()->json(['success' => false, 'message' => 'Paciente se encuentra desactivado.']);
        }

        return response()->json(['success' => true, 'user' => $patient]);
    }

    public function getUsers()
    {
        $data = User::orderBy('id', 'DESC')->get();
        return $data;
    }

    public function getPatients()
    {
        $data = User::where('role', 'patient')->orderBy('id', 'DESC')->get();
        return $data;
    }

    public function getWorkers()
    {
        $data = User::where('role', 'admin')->orWhere('role', 'specialist')->orderBy('register_date', 'DESC')->get();
        return $data;
    }

    public function getMaxClinicalLog()
    {
        $data = User::max('id');
        return $data;
    }

    public function getLastsPatients()
    {
        $data = User::where('role', 'patient')->orderBy('id', 'DESC')->limit(7)->get();
        if ($data) {
            return response()->json(['success' => true, 'data' => $data]);
        }
        return response()->json(['success' => false]);
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
        $patient->id = $request->id;
        $patient->collegiate_num = $request->collegiate_num;
        $patient->role = $request->role;

        //Validate unique email
        $usersEmail = User::where('email', $request->email)->get();

        if (count($usersEmail) > 0) {
            return response()->json(['success' =>  false, 'message' => '(Email duplicado)']);
        }

        //Validate unique dni
        $usersDni = User::where('dni', $request->dni)->get();

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
        $patient->password =  Hash::make($request->password);
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
        $patient->id = $request->id;
        $patient->collegiate_num = $request->collegiate_num;
        $patient->role = $request->role;

        //Validate unique email
        $usersEmail = User::where('email', $request->email)->get();

        if (count($usersEmail) > 0) {
            return response()->json(['success' =>  false, 'message' => '(Email duplicado)']);
        }

        //Validate unique dni
        $usersDni = User::where('dni', $request->dni)->get();

        if (count($usersDni) > 0) {
            return response()->json(['success' =>  false, 'message' => '(NIF o NIE duplicado)']);
        }
        //Validate unique collegiate number
        $usersColNum = User::where('collegiate_num', $request->collegiate_num)->get();

        if (count($usersColNum) > 0) {
            return response()->json(['success' =>  false, 'message' => '(Número de colegiado duplicado)']);
        }

        $success = $patient->save();
        return response()->json(['success' =>  $success, 'user' => $patient]);
    }


    public function updateUser(Request $request)
    {
        $user = User::find($request->id);
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        if ($request->password != '') {
            $user->password = Hash::make($request->password);
        }
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
        $user->id = $request->id;
        $user->collegiate_num = $request->collegiate_num;
        $user->role = $request->role;
        $user->register_date = date('Y-m-d', strtotime($request->register_date));

        //Validate unique email
        $usersEmail = User::where('id', '!=', $user->id)->where('email', $request->email)->get();

        if (count($usersEmail) > 0) {
            return response()->json(['success' =>  false, 'message' => '(Email duplicado)']);
        }

        //Validate unique dni
        $usersDni = User::where('id', '!=', $user->id)->where('dni', $request->dni)->get();

        if (count($usersDni) > 0) {
            return response()->json(['success' =>  false, 'message' => '(NIF o NIE duplicado)']);
        }

        if ($user->role != 'patient') {

            //Validate unique collegiate number
            $usersColNum = User::where('id', '!=', $user->id)->where('collegiate_num', $request->collegiate_num)->get();

            if (count($usersColNum) > 0) {
                return response()->json(['success' =>  false, 'message' => '(Número de colegiado duplicado)']);
            }
        }

        $success = $user->update();

        return response()->json(['success' => $success, 'user' => $user]);
    }



    public function deactivateUser(Request $request)
    {
        $user = User::find($request->id);
        $user->active = $request->active;

        $success = $user->update();
        return response()->json(['success' => $success, 'user' => $user]);
    }


    public function deleteUser(Request $request)
    {
        $result = User::destroy($request->id);

        //$deletedUser = User::find($request->id);
        //$deletedUser->delete();

        return response()->json(['success' => $result]);
    }

    public function  getTotalPatients()
    {
        $users = User::where('role', 'patient')->count();
        if ($users) {
            return response()->json([
                'success' =>  true,
                'data' => $users
            ]);
        }
        return response()->json(['success' => false]);
    }
}
