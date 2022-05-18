<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
// use DB;
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->boolean('sent');
            $table->enum('payment_type', ['efectivo', 'tarjeta'])->nullable();
            $table->boolean('sent')->nullable();
            $table->dateTime('invoice_date');
            $table->float('total_price');
            //camp foreign key de user id
            $table->unsignedBigInteger('visit_id');
            //constraints FK (foreign key)
            $table->foreign('visit_id') //camp user id tindrà aquesta constraint
                ->references('id') //camp
                ->on('visits'); //taula

            $table->timestamps();
        });
        // DB::statement('ALTER TABLE invoices MODIFY number_invoice as concat(id, "", NOW())');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
};
