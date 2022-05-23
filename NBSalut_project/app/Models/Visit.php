<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use App\Models\Attached;
use App\Models\Uses;


class Visit extends Model
{
    use HasFactory;

    /**
     * Get the user that belongs to the visit.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the use of the visit.
     */
    public function uses()
    {
        return $this->hasMany(Uses::class);
    }

    /**
     * Get the attached of the user.
     */
    public function attached() {
        return $this->hasMany(Attached::class);
    }

        /**
     * Get the invoice associated with the user.
     */
    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
}
