<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use DB;

class InvoiceController extends Controller
{
    public function getInvoices()
    {
        $invoices = Invoice::join('visits', 'invoices.id', '=', 'visits.id')
            ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.id')
            ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
            ->join('treatments', 'invoice_details.treatment_id', '=', 'treatments.id')
            ->where('partner_invoices.role', 'patient')
            ->where('invoices.sent', false)
            ->select(
                'invoices.id',
                'invoices.number_invoice',
                'invoices.invoice_date',
                'partner_invoices.first_name',
                'partner_invoices.last_name',
                'partner_invoices.dni',
                'partner_invoices.address',
                'partner_invoices.postal_code',
                'treatments.name',
                'invoice_details.price'
            )
            ->get();

        if ($invoices) {
            return response()->json(['success' => true, 'data' => $invoices]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }

    public function getInvoicesBetweenDates(Request $request)
    {
        // return response()->json($request->startDate);
        $invoices = Invoice::join('visits', 'invoices.id', '=', 'visits.id')
            ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.id')
            ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
            ->join('treatments', 'invoice_details.treatment_id', '=', 'treatments.id')
            ->where('partner_invoices.role', 'patient')
            ->where('invoices.sent', false)
            ->whereBetween('invoices.invoice_date', [$request->startDate, $request->endDate])
            ->select(
                'invoices.id',
                'invoices.number_invoice',
                'invoices.invoice_date',
                'partner_invoices.first_name',
                'partner_invoices.last_name',
                'partner_invoices.dni',
                'partner_invoices.address',
                'partner_invoices.postal_code',
                'treatments.name',
                'invoice_details.price'
            )
            ->get();

        if ($invoices) {
            return response()->json(['success' => true, 'data' => $invoices]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }


    public function sendInvoice(Request $request)
    {
        return $request;
    }
}
