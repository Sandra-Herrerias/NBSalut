<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\Invoice;
use DB;

class InvoiceController extends Controller
{
    public function getInvoices()
    {
            // ->select('visits.visit_date', 'invoices.id as invoice_id','users.dni', 'users.first_name', 'users.last_name', 'users.num_clinical_log', 'users.address', 'users.postal_code', 'treatments.name', 'treatments.price')

            $invoices = DB::table('invoices')
            ->join('visits', 'invoices.id', '=', 'visits.id')
            ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.invoice_id')
            ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
            ->join('treatments','invoice_details.treatment_id', '=','treatments.id')
            ->where('partner_invoices.role', 'patient')
            ->select()
            ->get();

            if ($invoices) {
                return response()->json(['success' => true, 'data' => $invoices]);
            }

            return response()->json(['success' => false, 'data' => []]);
    }
}
