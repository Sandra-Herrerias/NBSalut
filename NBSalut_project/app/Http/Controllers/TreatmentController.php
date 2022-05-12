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
}
