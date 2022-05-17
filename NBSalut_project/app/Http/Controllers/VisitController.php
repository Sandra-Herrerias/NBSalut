<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visit;
use App\Models\User;
use Validator;
use DB;


class VisitController extends Controller
{
    
    public function getVisitsPatient(Request $request)
    {
        // $visits = DB::table('visits')
            
        //     ->join('users', 'visits.user_id', '=', 'users.id')
        //     ->join('uses', 'visits.id', '=', 'uses.visit_id')
        //     ->join('treatments', 'uses.treatment_id', '=', 'treatments.id')
        //     ->where('visits.user_id', $request->id)
        //     ->select('visits.id', 'visits.visit_date', 'users.first_name','users.last_name', 'visits.visit_description')
            
        //     ->get();
        // return $visits;

        // return Visit::addSelect(['visit_date' => User::select('first_name','last_name')
        //     ->whereColumn('visits.user_id','users.id')
        // ])->get();

        return Visit::select('visits.id','visits.visit_date','visits.visit_description','users.first_name','users.last_name')
        ->join('users', 'visits.user_id', '=', 'users.id')
        ->join('uses', 'visits.id', '=', 'uses.visit_id')
        ->where('visits.user_id', $request->id)
        ->get();
    }

    public function insertVisit(Request $request) {

        $validator = Validator::make($request->all(), [
            'description' => 'string',
            'date' => 'required|date',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false]);
        } else {
            $visit = new Visit;
            $visit->id;
            $visit->visit_description = $request->description;
            $visit->visit_date = $request->date;
            $visit->ss_private = "No";
            $visit->user_id = 7;
            
                if ($visit->save()) {
                    return response()->json(['success' => true, 'visit' => $visit]);
                }   
        }
        return response()->json(['success' => false]);
    }
}
