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
        Schema::create('person', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('password');
            $table->string('dni');
            $table->string('email')->unique();
            // $table->string('phone', 9);
            $table->date('birthdate');
            $table->string('city');
            $table->string('address');
            $table->string('postal_code');

            $table->boolean('active')->default(true)->nullable(); // Patient
            $table->string('previous_pathologies')->nullable(); // Patient
            $table->boolean('diabetic')->default(false)->nullable(); // Patient
            $table->string('ss_CIP')->nullable();; // Patient
            $table->string('center_code')->nullable(); // Patient
            $table->string('num_clinical_log')->nullable(); // Patient
 
            $table->string('collegiate_num')->nullable(); // Specialist
            $table->enum('role', ['admin', 'specialist'])->nullable();
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
        Schema::dropIfExists('person');
    }
};
