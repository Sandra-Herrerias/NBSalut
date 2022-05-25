<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visit;
use App\Models\Uses;
use App\Models\Attached;
use App\Models\Invoice;
use App\Models\Treatment;



use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class VisitController extends Controller
{

    public function getVisitsPatient(Request $request)
    {
        // return Visit::select('visits.id', 'visits.visit_date', 'visits.visit_description', 'users.first_name', 'users.last_name', 'users.dni',)
        //     ->join('users', 'visits.user_id', '=', 'users.id')
        //     ->join('uses', 'visits.id', '=', 'uses.visit_id')
            
        //     ->where('visits.user_id', $request->id)
        //     ->get();

        return DB::select(DB::raw("select `visits`.`id`, `visits`.`visit_date`,
            `visits`.`visit_description`, `visits`.`user_id`,
            `users`.`first_name`, `users`.`last_name`, `users`.`dni`,
            `users`.`diabetic`, `uses`.`treatment_id`,
            `uses`.`user_id`, `treatments`.`name`,
            (select first_name AS specialist_name from users AS t where t.id=uses.user_id)AS specialist_name
            from `visits`
            inner join `users` on `visits`.`user_id` = `users`.`id` 
            inner join `uses` on `visits`.`id` = `uses`.`visit_id` 
            inner join `treatments` on `visits`.`id` = `treatments`.`id`
            where `visits`.`user_id`= $request->id
            "
        ));

    }

    public function getVisits()
    {
        return Visit::select(
            'visits.id',
            'visits.visit_date',
            'visits.visit_description',
            // 'visits.ss_private',
            'users.first_name',
            'users.last_name',
            'users.dni',
            // 'users.num_clinical_log',
            'users.diabetic',
            'uses.treatment_id'
        )
            ->join('users', 'visits.user_id', '=', 'users.id')
            ->join('uses', 'visits.id', '=', 'uses.visit_id')
            ->join('invoices', 'visits.id', '=', 'invoices.visit_id')
            ->get();
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
            $visit->ss_private = "No";
            $visit->user_id = $request->user_id;
            $visit->sent = 0;

            if ($visit->save()) {
                //return count($request->treat);
                for ($i = 0; $i < count($request->treat); $i++) {


                    // foreach ($request->treat as $t) {
                    $tFound = Treatment::find($request->treat[$i]['id'])->first();

                    $uses = new Uses;
                    $uses->visit_id = $visit->id;
                    $uses->user_id = $request->user_id;
                    $uses->treatment_id = $request->treat[$i]['id'];

                    $attached = new Attached;
                    $attached->id;
                    $attached->type = "image";
                    $attached->document = "file";
                    $attached->visit_id = $visit->id;

                    if ($request->facturate == true) {
                        $invoice = new Invoice;
                        $invoice->id;
                        $invoice->payment_type = "Tarjeta";
                        $invoice->invoice_date = $request->date;
                        $invoice->total_price = $tFound['price'];
                        $invoice->visit_id = $visit->id;

                        $invoice->save();
                    }

                    if ($uses->save() && $attached->save()) {
                        return response()->json(['success' => true, 'visit' => $visit]);
                    }
                }
            }
        }





        // if ($validator->fails()) {
        //     return response()->json(['success' => false]);
        // } else {
        //     $visit = new Visit;
        //     $visit->id;
        //     $visit->visit_description = $request->description;
        //     $visit->visit_date = $request->date;
        //     $visit->ss_private = "No";
        //     $visit->user_id = $request->user_id;

        //     if($visit->save()) {
        //         $uses = new Uses;
        //         $uses->visit_id = $visit->id;
        //         $uses->user_id = $request->user_id;
        //         $uses->treatment_id = $request->treat;

        //         $attached = new Attached;
        //         $attached->id;
        //         $attached->type = "image";
        //         $attached->document = "file";
        //         $attached->visit_id = $visit->id;

        //         if($request->facturate == true) {
        //             $invoice = new Invoice;
        //             $invoice->id;
        //             $invoice->payment_type = "Tarjeta";
        //             $invoice->invoice_date = $request->date;
        //             $invoice->total_price = $request->price;
        //             $invoice->visit_id = $visit->id;

        //             $invoice->save();
        //         }

        //     if ( $uses->save() && $attached->save()) {
        //         return response()->json(['success' => true, 'visit' => $visit]);
        //     }
        //     }
        // }
        return response()->json(['success' => false],);
    }

    public function getVisitsList() {
        return DB::select(DB::raw("select `visits`.`id`, `visits`.`visit_date`,
         `visits`.`visit_description`,
         `users`.`first_name`, `users`.`last_name`, `users`.`dni`,
           `users`.`diabetic`, `uses`.`treatment_id`,
           `uses`.`user_id`, `treatments`.`name`,
           (select CONCAT(first_name,' ', last_name) AS specialist_name from users AS t where t.id=uses.user_id)AS specialist_name
            from `visits` inner join `users` on `visits`.`user_id` = `users`.`id` inner join `uses` on `visits`.`id` = `uses`.`visit_id` inner join `treatments` on `visits`.`id` = `treatments`.`id`"
    ));
    }
}
