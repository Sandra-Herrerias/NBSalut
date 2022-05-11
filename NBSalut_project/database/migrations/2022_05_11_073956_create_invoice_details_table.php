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
         

            $table->float('price');
            $table->integer('quantity');
            $table->float('total');

            $table->unsignedBigInteger('treatment_id');

            $table->unsignedBigInteger('invoice_id');

            //constraints FK (foreign key)
            $table->foreign('invoice_id') 
                ->references('id') 
                ->on('invoices');

            //constraints FK (foreign key)
            $table->foreign('treatment_id') 
                ->references('id') 
                ->on('treatments');

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
