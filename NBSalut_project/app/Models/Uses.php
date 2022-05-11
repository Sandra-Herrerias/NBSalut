<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Treatment;
use App\Models\Visit;
use App\Models\Person;


class Uses extends Model
{
    use HasFactory;

    /**
     * Get the treatment that belongs to the use.
     */
    public function treatment()
    {
        return $this->belongsTo(Treatment::class);
    }

     /**
     * Get the visit that belongs to the use.
     */
    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }

     /**
     * Get the person that belongs to the use.
     */
    public function person()
    {
        return $this->belongsTo(Person::class);
    }
}
