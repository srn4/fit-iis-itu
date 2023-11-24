<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'post';

    protected $fillable = ['likes','dislikes','content','subject','group_id', 'user_id'];

    public function likes()
    {
        return $this->hasMany(PostLike::class);
    }

    public function reactionCounts()
    {
        return $this->likes->groupBy('reaction')->mapWithKeys(function ($group, $key) {
            return [$key => count($group)];
        });
    }

    public function likesCount(){
        return $this->hasMany(PostLike::class)->where('reaction', 'like');
    }

    public function dislikesCount(){
        return $this->hasMany(PostLike::class)->where('reaction', 'dislike');
    }
}
