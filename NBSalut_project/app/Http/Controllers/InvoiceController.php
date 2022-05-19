<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use DB;

class InvoiceController extends Controller
{
    public function getInvoices()
    {

        // $invoices = DB::table('invoices')
        // ->join('visits', 'invoices.id', '=', 'visits.id')
        // ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.id')
        // ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
        // ->join('treatments', 'invoice_details.treatment_id', '=','treatments.id')
        // ->where('partner_invoices.role','patient')
        // // ->select('visits.visit_date', 'invoices.id'
        // // ,'partner_invoices.dni', 'partner_invoices.first_name', 'partner_invoices.last_name', 'partner_invoices.address',
        // //  'partner_invoices.postal_code', 'treatments.name',
        // //   'treatments.price')
        // ->get();
        // // ->join('partner_')

        $invoices = Invoice::join('visits', 'invoices.id', '=', 'visits.id')
        ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.id')
        ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
        ->join('treatments', 'invoice_details.treatment_id', '=','treatments.id')
        ->where('partner_invoices.role','patient')
        ->select('invoices.id','invoices.invoice_date','partner_invoices.first_name',
        'partner_invoices.last_name','partner_invoices.dni','partner_invoices.address', 'partner_invoices.postal_code',
         'treatments.name','invoice_details.price')
        ->get();

            if ($invoices) {
                return response()->json(['success' => true, 'data' => $invoices]);

            }

        // $eloquent = Invoice::addSelect(['visits' => Visit::select('')
        // ->whereColumn('invoices.visit_id','visits.id')])->get();
        return response()->json(['success' => false, 'data' => []]);

    }
}
