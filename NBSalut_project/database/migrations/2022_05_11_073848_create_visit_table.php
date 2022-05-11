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
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->string('visit_description');
            $table->string('recommendations');
            $table->date('visit_date');
            $table->string('ss_private');

            // //Foreign keys
            $table->unsignedBigInteger('person_id');

            // //Constraints FK
            // $table->foreign('person_id')
            //     ->references('id')
            //     ->on('person')
            //     ->nullOnDelete();
            $table->foreign('person_id')->references('id')->on('users');
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
        Schema::dropIfExists('visits');
    }
};
