<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mpesa extends Model
{
    use HasFactory;
    protected $fillable = 
    [
        'org_id',
        'short_code',
        'partya',
        'partyb',
        'phone_number'
    ];
}

