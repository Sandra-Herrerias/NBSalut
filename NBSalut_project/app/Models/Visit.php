<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Person;
use App\Models\Attached;
use App\Models\Uses;


class Visit extends Model
{
    use HasFactory;

    /**
     * Get the person that belongs to the visit.
     */
    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    /**
     * Get the use of the visit.
     */
    public function uses()
    {
        return $this->hasOne(Uses::class);
    }

    /**
     * Get the attached of the user.
     */
    public function attached() {
        return $this->hasOne(Attached::class);
    }
}
