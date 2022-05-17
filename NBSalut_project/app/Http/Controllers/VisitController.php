<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visit;
use Validator;
use DB;


class VisitController extends Controller
{
    
    public function getVisitsPatient(Request $request)
    {
        $visits = DB::table('visits')
            
            ->join('users', 'visits.user_id', '=', 'users.id')
            ->join('uses', 'visits.id', '=', 'uses.visit_id')
            ->join('treatments', 'uses.treatment_id', '=', 'treatments.id')
            ->where('visits.user_id', $request->id)
            ->select('visits.id', 'visits.visit_date', 'users.first_name','users.last_name', 'treatments.name','treatments.price','visits.visit_description')
            
            ->get();
        return $visits;
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
            $visit->recommendations = null;
            $visit->visit_date = $request->date;
            $visit->ss_private = null;
            $visit->user_id = 7;
            
                if ($visit->save()) {
                    return response()->json(['success' => true, 'visit' => $visit]);
                }   
        }
        return response()->json(['success' => false]);
        

        // $visit = new Visit;
        // $visit->id;
        // $visit->visit_description = $request->description;
        // $visit->recommendations = null;
        // $visit->visit_date = $request->date;
        // $visit->ss_private = null;
        // $visit->user_id = 7;
        // $visit->save();

        // $visits = DB::table('visits')
        //     ->insert([
        //         'visit_description' => $request->desc,
        //         'visit_date' => $request->date
        //     ]);
        // $visits->save();

        // return response()->json(['success' => true, 'visit' => $visit]);
    }
}
