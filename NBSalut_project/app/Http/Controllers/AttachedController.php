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
            $profileImage = $image->getClientOriginalName();
            $image->move($destinationPath, $profileImage); 
            $input['type'] = $image->getClientOriginalExtension();
            $input['image'] = "$profileImage";
            $input['visit_id'] = $visit_id;
        }

        Attached::create($input);

        return response()->json(['success' => $input]);
    }

    public function getImages() {

    }
}
