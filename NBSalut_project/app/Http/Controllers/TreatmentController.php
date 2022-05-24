<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Treatment;

use Validator;

class TreatmentController extends Controller
{
    public function getTreatments(Request $request){ 
        $data = Treatment::all();
        return $data;
    }

    public function getTreatment(Request $request) {
        //return Treatment::find($request)->first();
        $treat = Treatment::find($request)->first();
        if ($treat != null) {
            return response()->json(['success' => true, 'treat' => $treat]);
        } else {
            return response()->json(['success' => false]);

        }
    }

    public function addTreatment(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json(['success' => false]);
        } else {

            $treat = new Treatment;
                $treat->id;
                $treat->name = $request->name;
                $treat->description = $request->desc;
                $treat->price = $request->price;
                $treat->active = true;

            if ($treat->save()) {
                return response()->json(['success' => true, 'visit' => $treat]);
            }
        }   

        return response()->json(['success' => false]);
    }

    public function statusTreatment(Request $request) {

        //return $request;
        //$tFound = Treatment::find($request->id)->delete();

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'active' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json(['success' => false]);
        } else {

            $treat = Treatment::find($request->id);

            if($request['active'] == true) {
                $treat->active = false;
            } else {
                $treat->active = true;
            }

            $success = $treat->update();

            if($success) {
                return response()->json(['success' => true, 'treatDEL' => $treat]);
            }
        }
        return response()->json(['success' => false]);
        
    }

    public function modTreatment(Request $request) {

        //return $request;
        
        $treat = Treatment::find($request->id);
        $treat->name = $request->name;
        $treat->price = $request->price;
        $treat->description = $request->desc;

        $success = $treat->update();

        if($success) {
            return response()->json(['success' => true, 'treatUP' => $treat]);
        } else {
            return response()->json(['success' => false]);
        }
        
    }
}
