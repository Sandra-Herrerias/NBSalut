<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visit;
use DB;


class VisitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getVisits()
    {
        // $visits = DB::table('visits')
        //     ->join('users', 'visits.id', '=', 'users.id')
        //     ->join('uses', 'visits.id', '=', 'uses.visit_id')
        //     ->join('offers', 'uses.treatment_id', '=', 'offers.treatment_id')
        //     ->join('treatments', 'offers.treatment_id', '=', 'treatments.id')
        //     ->join('invoices', 'visits.id', '=', 'invoices.visit_id')
        //     ->select('visits.visit_date', 'invoices.id as invoice_id', 'users.first_name','users.last_name','users.num_clinical_log','users.address','users.postal_code','treatments.name','treatments.price')


        //     ->get();
        // return $visits;
    }
}