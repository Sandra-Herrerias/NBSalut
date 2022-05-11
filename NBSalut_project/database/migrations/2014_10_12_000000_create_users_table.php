<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('dni');
            $table->string('email')->unique();
            $table->integer('phone');
            $table->date('birthdate');
            $table->string('city');
            $table->string('address');
            $table->string('postal_code');
            $table->boolean('active')->default(true);
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('collegiate_num');
            $table->enum('role', ['admin', 'specialist'])->default('specialist');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
