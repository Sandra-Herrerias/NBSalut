<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attached;
use App\Models\Visit;

use DB;


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

    public function listFiles(Request $request) {
        // return DB::select(DB::raw(
        //     "SELECT `visits`.`id`, `visits`.`user_id`, `attacheds`.`image`
        //      INNER JOIN `users` ON `visits`.`user_id`
        //      = `users`.`id` 
        //      INNER JOIN `attacheds` ON `visits`.`id` = `attacheds`.`visit_id`
        //      WHERE `visits`.`user_id` = $request->id
        //     "
        // ));

        //return $request;

        $user_id = $request[0];

        //return $user_id;

        $images = DB::table('attacheds')
            ->join('visits', 'visits.id', '=', 'attacheds.visit_id')
            ->join('users', 'users.id', '=', 'visits.user_id')
            ->where('users.id', '=', $user_id)
            ->select('attacheds.*')
            ->get();


        if ($images) {
            return response()->json(['success' => true, 'data' => $images]);
        }

        return response()->json(['success' => false, 'data' => []]);
    }
}
