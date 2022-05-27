<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attached;
use App\Models\Visit;



class AttachedController extends Controller
{
    public function upload(Request $request) {
        //return $request;
        //$visit = Visit::latest()->first();
        $visit_id = Visit::max('id');
        //return $visit_id;

        $request->validate([
            'image' => 'image|max:4096'
        ]);

        $input = $request->all();

        if($image = $request->file('image')) {
            $destinationPath = 'public/visits/images';
            // $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $profileImage = $image->getClientOriginalName() . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage); 
            $input['image'] = "$profileImage";
            $input['visit_id'] = 99 | null;

            // $attached = new Attached;
            // $attached->type = $image->getClientOriginalExtension();
            // $attached->image = "$profileImage";
            // $attached->visit_id = 99;
            // $attached->save();
        }

        Attached::create($input);

        return response()->json(['success' => $input]);
    }

    public function getImages() {

    }
}
