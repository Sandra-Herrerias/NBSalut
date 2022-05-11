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
        Schema::create('offers', function (Blueprint $table) {

            //Foreign keys
            $table->unsignedBigInteger('person_id')->unsigned()->nullable();
            $table->unsignedBigInteger('treatment_id')->unsigned()->nullable();

            //Constraints FK
            $table->foreign('person_id')
                ->references('id')
                ->on('person')
                ->nullOnDelete();

            $table->foreign('treatment_id')
                ->references('id')
                ->on('treatments')
                ->nullOnDelete();

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
        Schema::dropIfExists('offers');
    }
};
