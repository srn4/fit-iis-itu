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
        return $this->belongsToMany(User::class,'group_member','group_id','user_id')->withPivot('role');
    }

    /**
     * Add users to the group.
     *
     * @param  array  $userIds
     * @return void
     */
    public function addUsers(array $userIds)
    {
        $this->users()->attach($userIds);
    }

    /**
     * Remove users from the group.
     *
     * @param  array  $userIds
     * @return void
     */
    public function removeUsers(array $userIds)
    {
        $this->users()->detach($userIds);
    }

    public function interest()
    {
        return $this->belongsTo(Interest::class);
    }
}
