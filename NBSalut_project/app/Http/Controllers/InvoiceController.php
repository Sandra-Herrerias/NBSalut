<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class InvoiceController extends Controller
{
    public function getInvoices()
    {
        $visits = DB::table('visits')
            ->join('users', 'visits.id', '=', 'users.id')
            ->join('uses', 'visits.id', '=', 'uses.visit_id')
            ->join('offers', 'uses.treatment_id', '=', 'offers.treatment_id')
            ->join('treatments', 'offers.treatment_id', '=', 'treatments.id')
            ->join('invoices', 'visits.id', '=', 'invoices.visit_id')
            ->select('visits.visit_date', 'invoices.id as invoice_id','users.dni', 'users.first_name', 'users.last_name', 'users.num_clinical_log', 'users.address', 'users.postal_code', 'treatments.name', 'treatments.price')
            ->get();


        return response()->json(['success' => true, 'data' => $visits]);
    }
}