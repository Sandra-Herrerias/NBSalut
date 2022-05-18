<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\Invoice;
use DB;

class InvoiceController extends Controller
{
    public function getInvoices()
    {
        // $visits = DB::table('visits')
        //     ->join('users', 'visits.id', '=', 'users.id')
        //     ->join('uses', 'visits.id', '=', 'uses.visit_id')
        //     ->join('offers', 'uses.treatment_id', '=', 'offers.treatment_id')
        //     ->join('treatments', 'offers.treatment_id', '=', 'treatments.id')
        //     ->join('invoices', 'visits.id', '=', 'invoices.visit_id')
        //     ->select('visits.visit_date', 'invoices.id as invoice_id','users.dni', 'users.first_name', 'users.last_name', 'users.num_clinical_log', 'users.address', 'users.postal_code', 'treatments.name', 'treatments.price')
        //     ->get();

            // if ($invoices) {
            //     return response()->json(['success' => true, 'data' => $invoices]);
            // }

        $invoices = DB::table('invoices')
        ->join('visits', 'invoices.id', '=', 'visits.id')
        ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.id')
        ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
        ->join('treatments', 'invoice_details.treatment_id', '=','treatments.id')
        ->where('partner_invoices.role','patient')
        // ->select('visits.visit_date', 'invoices.id'
        // ,'partner_invoices.dni', 'partner_invoices.first_name', 'partner_invoices.last_name', 'partner_invoices.address',
        //  'partner_invoices.postal_code', 'treatments.name',
        //   'treatments.price')
        ->get();
        // ->join('partner_')

        return response()->json(['success' => true, 'data' => $invoices]);
    }
}
