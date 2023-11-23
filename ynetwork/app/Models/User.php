<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    //protected $table = 'users';
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'login',
        'password',
        'role',
        'isVerified',
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'isVerified' => 'boolean',
    ];

    /**
     * Define the many-to-many relationship with Group model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_member', 'user_id', 'group_id')->withTimestamps();
    }

    /**
     * Add groups to the user.
     *
     * @param  array  $groupIds
     * @return void
     */
    public function addGroups(array $groupIds)
    {
        $this->groups()->attach($groupIds);
    }

    public function removeGroups(array $groupIds){
        $this->groups()->detach($groupIds);
    }
}
