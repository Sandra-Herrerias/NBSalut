<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice_detail extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }

    // public function treatment()
    // {
    //     return $this->hasOne(Treatment::class);
    // }
}
