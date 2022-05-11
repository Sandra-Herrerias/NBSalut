<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function partner_invoices()
    {
        return $this->hasMany(Partner_invoice::class);
    }


        /**
     * Get the phone associated with the user.
     */
    public function visit()
    {
        return $this->hasOne(Visit::class);
    }

    public function invoice_detail()
    {
        return $this->hasOne(Invoice_detail::class);
    }
}
