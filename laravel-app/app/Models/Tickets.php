<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    use HasFactory;
    protected $fillable = 
    [
        'first_name',
        'last_name',
        'email',
        'name',
        'event_id',
        'type',
        'no_people',
        'qr_code',
        'validated',
        'purchased',
        'price',
        'qr_code_image'
    ];

    public function event()
    {
        return $this->belongsTo(Events::class, 'event_id', 'event_id');
    }
}
