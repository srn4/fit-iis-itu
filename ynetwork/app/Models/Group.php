<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;
    protected $table = '_group';
    protected $fillable = ['name', 'description'];

    public function users(){
        return $this->belongsToMany(User::class, 'group_id','user_id');
    }
}
