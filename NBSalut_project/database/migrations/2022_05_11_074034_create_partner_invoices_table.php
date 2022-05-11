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
        Schema::create('partner_invoices', function (Blueprint $table) {
            $table->id();

            $table->string('phone');
            $table->string('dni');
            $table->string('collegiate_num');
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('role',['admin','specialist','patient'])->nullable();
            $table->string('nif');
            $table->string('postal_code');
            $table->string('address');
            $table->string('city');

            //camp foreign key de user id
            $table->unsignedBigInteger('invoice_id')->nullable();
            //constraints FK (foreign key)
            $table->foreign('invoice_id') //camp user id tindrà aquesta constraint
                ->references('id') //camp
                ->on('invoices') //taula
                ->onDelete('set null');

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
        Schema::dropIfExists('partner_invoices');
    }
};
