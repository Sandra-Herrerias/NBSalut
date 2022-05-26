<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use DB;

class InvoiceController extends Controller
{
    public function getInvoices(Request $request)
    {
        // $invoices = DB::table('invoices')
        //     // ->join('visits', 'invoices.id', '=', 'visits.id')
        //     ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.id')
        //     ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
        //     // ->where('partner_invoices.role', 'patient')
        //     ->where(function ($query) use ($request) {
        //         if ($request->startDate && $request->endDate) {
        //             $query->whereBetween('invoices.invoice_date', [$request->startDate, $request->endDate]);
        //         }
        //     })->where(function ($query) use ($request) {
        //         if ($request->sent == "sent" || $request->sent == "pending") {
        //             $query->where('invoices.sent', $request->sent == "sent" ? 1 : 0);
        //         }
        //     })
        //     ->select(
        //         'invoices.id',
        //         'invoices.invoice_date',
        //         'invoices.sent',
        //         'partner_invoices.first_name',
        //         'partner_invoices.last_name',
        //         'partner_invoices.dni',
        //         'partner_invoices.address',
        //         'partner_invoices.postal_code',
        //         'invoice_details.name',
        //         'invoice_details.price'
        //     )
        //     ->get();

        $invoices = DB::table('invoices')
            ->leftjoin('partner_invoices', 'invoices.id', '=', 'partner_invoices.invoice_id')
            ->leftjoin('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
            ->where('partner_invoices.role', 'patient')
            ->where('invoices.specialist_id', '=', $request->specialist_id)
            ->where(function ($query) use ($request) {
                if ($request->startDate && $request->endDate) {
                    $query->whereBetween('invoices.invoice_date', [$request->startDate, $request->endDate]);
                }
            })->where(function ($query) use ($request) {
                if ($request->sent == "sent" || $request->sent == "pending") {
                    $query->where('invoices.sent', $request->sent == "sent" ? 1 : 0);
                }
            })
            ->select(
                'invoices.*',
                'partner_invoices.first_name',
                'partner_invoices.last_name',
                'partner_invoices.dni',
                'partner_invoices.address',
                'partner_invoices.postal_code',
                'invoice_details.name',
                'invoice_details.price'
            )
            ->get();

        if ($invoices) {
            return response()->json(['success' => true, 'data' => $invoices, 'id'=>$request->specialist_id]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }

    public function sentInvoicesChecked(Request $request)
    {
        if ($request->invoices) {
            foreach ($request->invoices as $id) {
                $invoiceToSent = Invoice::where('id', $id)->update(["sent" => true]);
            }
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false]);
    }

    public function getTotalInvoices()
    {
        $total_invoices = Invoice::count();

        if ($total_invoices) {
            return response()->json(['success' => true, 'data' => $total_invoices]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }



    /**
     * Create an invoice with the visit data given.
     */
    public function generateInvoice(Request $request)
    {

        return $request;
    }
}
