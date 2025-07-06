<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_email',
        'amount_paid',
        'currency',
    ];

    public static function rules(): array
    {
        return [
            'user_email' => ['required', 'string', 'email', 'min:5', 'max:70'],
            'amount_paid' => ['required', 'numeric', 'regex:/^\d{1,16}(\.\d{1,2})?$/'],
            'currency' => ['required', 'string', 'min:1', 'max:20'],
        ];
    }
}
