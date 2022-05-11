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
        Schema::create('attached', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->text('document');

            //Foreign keys
            $table->unsignedBigInteger('person_id')->unsigned()->nullable();

            //Constraints FK
            $table->foreign('person_id')
                ->references('id')
                ->on('person')
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
        Schema::dropIfExists('attached');
    }
};
