<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = 
    [   'user_id',
        'name',
        'address',
        'country',
        'city',
        'email',
        'phone'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function queries()
    {
        return $this->hasMany(Queries::class, 'org_id');
    }
}
