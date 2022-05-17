<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Nullable;

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
           // $table->unsignedInteger('age');
            $table->string('password')->nullable();
            $table->string('dni');
            $table->string('email')->unique();
            $table->string('phone');
            $table->date('birthdate');
            $table->string('city');
            $table->string('address');
            $table->string('postal_code');

            $table->boolean('active')->default(true)->nullable(); // Patient
            $table->string('previous_pathologies')->nullable(); // Patient
            $table->boolean('diabetic')->default(false)->nullable(); // Patient
            $table->string('ss_CIP')->nullable();; // Patient
            $table->string('center_code')->nullable(); // Patient
            $table->integer('num_clinical_log')->unsigned(); // Patient

            $table->string('collegiate_num')->nullable(); // Specialist

            $table->enum('role', ['admin', 'specialist', 'patient'])->default('patient');
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
