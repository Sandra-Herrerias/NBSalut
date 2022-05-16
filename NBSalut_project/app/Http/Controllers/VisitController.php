<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visit;
use DB;


class VisitController extends Controller
{
    
    public function getVisits(Request $request)
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

        $visit = DB::table('visits')
            ->insert([
                'visit_description' => $request->desc,
                'visit_date' => $request->date
            ]);

        return $visit;
    }
}
