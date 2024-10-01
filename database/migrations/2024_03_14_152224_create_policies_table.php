<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('policies', function (Blueprint $table) {
            $table->id();
            $table->string('cookies_title', 100)->nullable();
            $table->text('cookies_text')->nullable();
            $table->string('cookies_seo_title', 80)->nullable();
            $table->string('cookies_seo_description', 200)->nullable();

            $table->string('privacy_title', 100)->nullable();
            $table->text('privacy_text')->nullable();
            $table->string('privacy_seo_title', 80)->nullable();
            $table->string('privacy_seo_description', 200)->nullable();

            $table->string('terms_title', 100)->nullable();
            $table->text('terms_text')->nullable();
            $table->string('terms_seo_title', 80)->nullable();
            $table->string('terms_seo_description', 200)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policies');
    }
};
