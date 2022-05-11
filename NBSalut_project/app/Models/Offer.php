<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Treatment;
use App\Models\Person;

class Offer extends Model
{
    use HasFactory;


    /**
     * Get the treatment that belongs to the offer.
     */
    public function treatment()
    {
        return $this->belongsTo(Treatment::class);
    }

     /**
     * Get the treatment that belongs to the offer.
     */
    public function person()
    {
        return $this->belongsTo(Person::class);
    }
}
