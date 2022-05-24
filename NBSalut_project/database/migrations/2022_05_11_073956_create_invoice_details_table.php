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
            // $table->unsignedBigInteger('treatment_id');
            // $table->unsignedBigInteger('invoice_id');
            // $table->float('price');
            // $table->integer('quantity')->default(1);
            // $table->float('total');
            // //constraints FK (foreign key)
            // $table->foreign('invoice_id')
            //     ->references('id')
            //     ->on('invoices');
            // //constraints FK (foreign key)
            // $table->foreign('treatment_id')
            //     ->references('id')
            //     ->on('treatments');
            // $table->primary(['treatment_id', 'invoice_id']);
            // $table->timestamps();
            $table->id();
            $table->unsignedBigInteger('invoice_id');
            $table->string('name');
            $table->float('price');
            $table->integer('quantity')->default(1);
            $table->float('total');
            $table->foreign('invoice_id')
                ->references('id')
                ->on('invoices');
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
