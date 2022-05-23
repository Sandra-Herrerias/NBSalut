<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Treatment;

class TreatmentController extends Controller
{
    public function getTreatments(Request $request){ 
        $data = Treatment::all();
        return $data;
    }

    public function getTreatment(Request $request) {
        return Treatment::find($request)->first();
    }

    public function addTreatment(Request $request) {
        $treat = new Treatment;
            $treat->id;
            $treat->name = $request->name;
            $treat->description = $request->desc;
            $treat->price = $request->price;

        if ($treat->save()) {
            return response()->json(['success' => true, 'visit' => $treat]);
        }

        return response()->json(['success' => false]);
    }

    public function delTreatment(Request $request) {

        //return $request->id;
        //$tFound = Treatment::find($request->id)->delete();

        if(Treatment::find($request->id)->delete()) {
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
        
    }
}
