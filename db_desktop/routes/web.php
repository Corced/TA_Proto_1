<?php

use Illuminate\Support\Facades\DB;


Route::get('/test-db', function () {
    $users = DB::table('users')->get(); // Replace 'users' with your actual table
    return $users;
});


