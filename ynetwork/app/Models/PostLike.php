<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostLike extends Model
{
    use HasFactory;

    protected $table = 'user_post_likes';
    protected $primaryKey = ['user_id', 'post_id'];
    public $incrementing = false;
    protected $fillable = ['user_id', 'post_id', 'reaction'];

    // Override the method to return an array of primary key names
    public function getKeyName()
    {
        return [$this->primaryKey[0], $this->primaryKey[1]];
    }
}
