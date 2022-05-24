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
        Schema::create('uses', function (Blueprint $table) {
            //Foreign keys
            $table->unsignedBigInteger('visit_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('treatment_id');
            //Constraints FK
            $table->foreign('visit_id')->references('id')->on('visits')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('treatment_id')->references('id')->on('treatments');
            $table->primary(['visit_id', 'user_id', 'treatment_id']);
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
        Schema::dropIfExists('uses');
    }
};
