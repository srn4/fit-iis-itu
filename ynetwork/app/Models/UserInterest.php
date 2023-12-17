<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInterest extends Model
{
    use HasFactory;

    protected $table = 'user_interest';

    protected $primaryKey = ['user_id', 'interest_id'];

    public $incrementing = false;

    protected $fillable = [
        'user_id', 'interest_id',
    ];

    public function interest()
    {
        return $this->belongsTo(Interest::class, 'interest_id');
    }
}
