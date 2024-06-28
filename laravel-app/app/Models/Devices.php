<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devices extends Model
{
    use HasFactory;
    
    protected $fillable = 
    [
        'org_id',
        'device_name',
        'location',
        'pin',
        'api_token',
        'event'
    ];
}
