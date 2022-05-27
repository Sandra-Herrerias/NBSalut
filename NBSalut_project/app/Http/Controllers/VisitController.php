<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visit;
use App\Models\Uses;
use App\Models\Attached;
use App\Models\Invoice;
use App\Models\Invoice_detail;
use App\Models\Partner_invoice;
use App\Models\Treatment;
use App\Models\User;


use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;



class VisitController extends Controller
{

    public function getVisitsPatient(Request $request)
    {
        return DB::select(DB::raw(
            "SELECT `visits`.`id`, `visits`.`visit_date`, `visits`.`visit_description`,
            `visits`.`user_id`, `users`.`first_name`, `users`.`last_name`, `users`.`dni`,
            `users`.`diabetic`, `uses`.`treatment_id`, `uses`.`user_id` AS especialist_id,
             `treatments`.`name`, ( SELECT CONCAT(first_name, ' ', last_name)
             AS specialist_name FROM users AS t WHERE t.id = uses.user_id )
             AS specialist_name FROM `visits` INNER JOIN `users` ON `visits`.`user_id`
             = `users`.`id` INNER JOIN `uses` ON `visits`.`id` = `uses`.`visit_id`
             INNER JOIN `treatments` ON `uses`.`treatment_id` = `treatments`.`id`
             WHERE `visits`.`user_id` = $request->id
            "
        ));
    }

    public function getVisits()
    {
        return Visit::select(
            'visits.id',
            'visits.visit_date',
            'visits.visit_description',
            'users.first_name',
            'users.last_name',
            'users.dni',
            'users.diabetic',
            'uses.treatment_id'
        )
            ->join('users', 'visits.user_id', '=', 'users.id')
            ->join('uses', 'visits.id', '=', 'uses.visit_id')
            ->join('invoices', 'visits.id', '=', 'invoices.visit_id')
            ->get();
    }

    public function getVisitsBySpecialist(Request $request)
    {
        return Visit::select(
            'visits.id',
            'visits.visit_date',
            'visits.visit_description',
            'users.first_name',
            'users.last_name',
            'users.dni',
            'users.diabetic',
            'uses.treatment_id'
        )
            ->join('users', 'visits.user_id', '=', 'users.id')
            ->join('uses', 'visits.id', '=', 'uses.visit_id')
            ->join('invoices', 'visits.id', '=', 'invoices.visit_id')
            ->where('uses', '$request->specialist_id', '=', 'uses.user_id')
            ->get()->count;
    }

    public function getTotalVisitsBySpecialist(Request $request)
    {
        $totalInvoices = DB::table('visits')
            // ->join('users', 'visits.user_id', '=', 'users.id')
            ->join('uses', 'visits.id', '=', 'uses.visit_id')
            ->where('uses.user_id', '=', $request->specialist_id)
            ->get()->count();

        if ($totalInvoices) {
            return response()->json(['success' => true, 'data' => $totalInvoices]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }

    public function getLastsVistsBySpecialist(Request $request)
    {
        $LastsVists = DB::select(DB::raw(
            "SELECT `visits`.`id`, `visits`.`visit_date`, `visits`.`visit_description`, `visits`.`user_id`, `users`.`first_name`, `users`.`last_name`, `users`.`dni`, `users`.`diabetic`, `uses`.`treatment_id`, `uses`.`user_id` AS especialist_id, `treatments`.`name`, ( SELECT CONCAT(first_name, ' ', last_name)
            AS specialist_name FROM users AS t WHERE t.id = uses.user_id )
            AS specialist_name FROM `visits` INNER JOIN `users`
            ON `visits`.`user_id` = `users`.`id` INNER JOIN `uses`
            ON `visits`.`id` = `uses`.`visit_id` INNER JOIN `treatments`
             ON `uses`.`treatment_id` = `treatments`.`id`
              WHERE `uses`.`user_id` = $request->id
              ORDER BY `visits`.`visit_date` DESC
              LIMIT 7;
            "
        ));

        if ($LastsVists) {
            return response()->json(['success' => true, 'data' => $LastsVists]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }

    public function insertVisit(Request $request)
    {
        //return $request;

        $validator = Validator::make($request->all(), [
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
            $visit->sent = 0;
            $visit->user_id = $request->user_id;

            if ($visit->save()) {
                $tFound = [];
                $total_price = 0;

                $specialist = User::find($request->specialist_id);
                $patient = User::find($request->user_id);

                //     $attached = new Attached;
                //     $attached->id;
                //     $attached->type = "image";
                //     $attached->document = "file";
                //     $attached->visit_id = $visit->id;

                foreach ($request->treat as $t) {
                    $tFound = $t['id'];
                    $treatment = Treatment::find($t['id']);
                    $total_price += $treatment->price;

                    $uses = new Uses;
                    $uses->visit_id = $visit->id;
                    $uses->user_id = $request->specialist_id;
                    $uses->treatment_id = $t['id'];
                    $uses->save();
                }

                if ($request->facturate == true) {
                    foreach ($request->treat as $t) {
                        $treatment = Treatment::find($t['id']);
                        $invoice = new Invoice;
                        $invoice->id;
                        $invoice->invoice_number = $this->assignLastNumber($request->specialist_id);
                        $invoice->payment_type = "tarjeta";
                        $invoice->sent = 0;
                        $invoice->invoice_date = $request->date;
                        $invoice->total_price = $treatment->price;
                        $invoice->specialist_id = $request->specialist_id;
                        $invoice->visit_id = $visit->id;
                        $invoice->save();

                        $partnerInvoice = new Partner_invoice;
                        $partnerInvoice->phone = $specialist->phone;
                        $partnerInvoice->dni = $specialist->dni;
                        $partnerInvoice->collegiate_num = $specialist->collegiate_num;
                        $partnerInvoice->first_name = $specialist->first_name;
                        $partnerInvoice->last_name = $specialist->last_name;
                        $partnerInvoice->role = $specialist->role;
                        $partnerInvoice->postal_code = $specialist->postal_code;
                        $partnerInvoice->address = $specialist->address;
                        $partnerInvoice->city = $specialist->city;
                        $partnerInvoice->invoice_id = $invoice->id;
                        $partnerInvoice->save();

                        $partnerInvoicePatient = new Partner_invoice;
                        $partnerInvoicePatient->phone = $patient->phone;
                        $partnerInvoicePatient->dni = $patient->dni;
                        $partnerInvoicePatient->first_name = $patient->first_name;
                        $partnerInvoicePatient->last_name = $patient->last_name;
                        $partnerInvoicePatient->role = $patient->role;
                        $partnerInvoicePatient->postal_code = $patient->postal_code;
                        $partnerInvoicePatient->address = $patient->address;
                        $partnerInvoicePatient->city = $patient->city;
                        $partnerInvoicePatient->invoice_id = $invoice->id;
                        $partnerInvoicePatient->save();

                        $invoice_detail = new Invoice_detail;
                        $invoice_detail->id;
                        $invoice_detail->invoice_id = $invoice->id;
                        $invoice_detail->name =  $treatment->name;
                        $invoice_detail->price =  $treatment->price;
                        $invoice_detail->quantity =  1;
                        $invoice_detail->total =  ($invoice_detail->quantity * $invoice_detail->price);
                        $invoice_detail->save();
                    }
                }

                return response()->json(['success' => true, 'visit_id' => $visit->id]);
            }
        }
    }

    public function assignLastNumber($specialist_id)
    {
        $lastInvoice = Invoice::where('specialist_id', $specialist_id)->orderBy('id', 'desc')->first();
        // $countAllInvoices = Invoice::where('specialist_id', $specialist_id)->count();
        $curYear = date('Y');
        if ($lastInvoice) {
            $lastInvoiceNumber = explode("/", $lastInvoice->invoice_number);
            if ($curYear != $lastInvoiceNumber[1]) {
                return "1/$curYear";
            }
            $lastInvoiceNumber[0] += 1;
            return "$lastInvoiceNumber[0]/$curYear";
        }
        return "1/$curYear";
    }

    public function getVisitsList()
    {
        return DB::select(DB::raw(
            "select `visits`.`id`, `visits`.`visit_date`,
         `visits`.`visit_description`,
         `users`.`first_name`, `users`.`last_name`, `users`.`dni`,
           `users`.`diabetic`, `uses`.`treatment_id`,
           `uses`.`user_id`, `treatments`.`name`,
           (select CONCAT(first_name,' ', last_name) AS specialist_name from users AS t where t.id=uses.user_id)AS specialist_name
            from `visits`
            inner join `users` on `visits`.`user_id` = `users`.`id`
            inner join `uses` on `visits`.`id` = `uses`.`visit_id`
            inner join `treatments` on `uses`.`treatment_id` = `treatments`.`id` ORDER BY visit_date DESC"
        ));
    }


    public function delVisit(Request $request)
    {
        $result = Visit::destroy($request->id);

        return response()->json(['success' => $result]);
    }
}
