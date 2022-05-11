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
        Schema::create('invoice_details', function (Blueprint $table) {
            $table->id();

            $table->float('price');
            $table->integer('quantity');
            $table->float('total');

            //camp foreign key de user id
            $table->unsignedBigInteger('treatment_id')->nullable();
            //constraints FK (foreign key)
            $table->foreign('treatment_id') //camp user id tindrà aquesta constraint
                ->references('id') //camp
                ->on('treatments') //taula
                ->onDelete('set null');
            //camp foreign key de user id
            $table->unsignedBigInteger('invoice_id')->nullable();
            //constraints FK (foreign key)
            $table->foreign('invoice_id') //camp user id tindrà aquesta constraint
                ->references('id') //camp
                ->on('invoices') //taula
                ->onDelete('set null');

            $table->primary(['treatment_id', 'invoice_id']);

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
        Schema::dropIfExists('invoice_details');
    }
};
