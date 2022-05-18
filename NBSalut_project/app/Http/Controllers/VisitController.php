<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visit;
use App\Models\User;
use App\Models\Uses;

use Validator;
use DB;


class VisitController extends Controller
{
    
    public function getVisitsPatient(Request $request)
    {
        return Visit::select('visits.id','visits.visit_date','visits.visit_description','users.first_name','users.last_name')
            ->join('users', 'visits.user_id', '=', 'users.id')
            ->join('uses', 'visits.id', '=', 'uses.visit_id')
            ->where('visits.user_id', $request->id)
        ->get();
    }

    public function getVisits() {
        return Visit::select('visits.id','visits.visit_date','visits.visit_description','users.first_name','users.last_name','users.dni','invoices.total_price')
            ->join('users', 'visits.user_id', '=', 'users.id')
            ->join('uses', 'visits.id', '=', 'uses.visit_id')
            ->join('invoices', 'visits.id', '=', 'invoices.visit_id')
        ->get();
    }

    public function insertVisit(Request $request) {

        $validator = Validator::make($request->all(), [
            'description' => 'string',
            'date' => 'required|date',
            'user_id' => 'required',
            'treat' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false]);
        } else {
            $visit = new Visit;
            $visit->id;
            $visit->visit_description = $request->description;
            $visit->visit_date = $request->date;
            $visit->ss_private = "No";
            $visit->user_id = $request->user_id;

            $uses = new Uses;
            $uses->visit_id = $visit->id;
            $uses->user_id = $request->user_id;
            $uses->treatment_id = 9;
            
                if ($visit->save() && $uses->save()) {
                    return response()->json(['success' => true, 'visit' => $visit]);
                }   
        }
        return response()->json(['success' => false]);
    }
}
