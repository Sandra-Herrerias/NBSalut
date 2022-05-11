<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner_invoice extends Model
{
    use HasFactory;
    protected $guarded = [];
       /**
     * Get the invoice associated with the partner_invoice.
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
