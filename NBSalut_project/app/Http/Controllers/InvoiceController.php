<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use DB;

class InvoiceController extends Controller
{
    public function getInvoices(Request $request)
    {
        $invoices = DB::table('invoices')
            ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.invoice_id')
            ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
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
                'invoices.id',
                'invoices.invoice_number as num_factura',
                'invoices.invoice_date as fecha',
                'invoices.sent',
                'partner_invoices.first_name as nombre',
                'partner_invoices.last_name as apellidos',
                'partner_invoices.dni',
                'partner_invoices.address as direccion',
                'partner_invoices.postal_code as codigo_postal',
                'invoice_details.name as tratamiento',
                'invoice_details.price as precio'
            )
            ->get();

        if ($invoices) {
            return response()->json(['success' => true, 'data' => $invoices]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }


    public function getLastsInvoicesBySpecialist(Request $request)
    {
        $invoices = DB::table('invoices')
            ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.invoice_id')
            ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
            ->where('partner_invoices.role', 'patient')
            ->where('invoices.specialist_id', '=', $request->specialist_id)
            ->select(
                'invoices.*',
                'partner_invoices.first_name',
                'partner_invoices.last_name',
                'partner_invoices.dni',
                'partner_invoices.address',
                'partner_invoices.postal_code',
                'invoice_details.name',
                'invoice_details.price'
            )->limit(7)->get();

        if ($invoices) {
            return response()->json(['success' => true, 'data' => $invoices]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }

    public function getTotalInvoicesBySpecialist(Request $request)
    {
        $totalInvoices = DB::table('invoices')
            ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.invoice_id')
            ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
            ->where('partner_invoices.role', 'patient')
            ->where('invoices.specialist_id', '=', $request->specialist_id)
            ->get()->count();

        if ($totalInvoices) {
            return response()->json(['success' => true, 'data' => $totalInvoices]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }





    public function getInvoice(Request $request)
    {
        $invoice = DB::table('invoices')
            ->join('partner_invoices', 'invoices.id', '=', 'partner_invoices.invoice_id')
            ->join('invoice_details', 'invoices.id', '=', 'invoice_details.invoice_id')
            ->where('invoices.id', '=', $request->invoice_id)
            ->select(
                'invoices.*',
                'partner_invoices.*',
                // 'partner_invoices.dni',
                // 'partner_invoices.address',
                // 'partner_invoices.postal_code',
                'invoice_details.name',
                'invoice_details.quantity',
                'invoice_details.price'
            )
            ->get();

        if ($invoice) {
            return response()->json(['success' => true, 'data' => $invoice]);
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

    /**
     * Create an invoice with the visit data given.
     */
    public function generateInvoice(Request $request)
    {

        return $request;
    }
}
