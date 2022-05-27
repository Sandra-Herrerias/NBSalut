<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Visit;


class Attached extends Model
{
    use HasFactory;

    protected $fillable = ['type','image', 'visit_id'];

     /**
     * Get the visit that belongs to the attached.
     */
    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }
}
