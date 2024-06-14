<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;
    protected $fillable = 
    [
        'user_id',
        'org_id',
        'name',
        'event_id',
        'event_date',
        'capacity',
        'venue',
        'time',
        'image',
        'ticket_price',
        'qr_code'
    ];

    public function tickets()
    {
        return $this->hasMany(Tickets::class, 'event_id', 'event_id');
    }
}