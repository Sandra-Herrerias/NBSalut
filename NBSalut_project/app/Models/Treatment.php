<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Offer;
use App\Models\Uses;



class Treatment extends Model
{
    use HasFactory;
    protected $guarded = [];
    /**
     * Get the offers of the treatment.
     */
    public function offers() {
        return $this->hasMany(Offer::class);
    }

    
    public function invoice_details() {
        return $this->hasMany(Invoice_detail::class);
    }
    
}
