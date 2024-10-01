<?php

use App\Models\LogError;
use Illuminate\Support\Facades\Auth;

function getSeo($title, $seoTitle, $seoDescription)
{
    return (object)[
        'title' => $title,
        'seoTitle' => $seoTitle,
        'seoDescription' => $seoDescription,
    ];
}

function getSeoSimple($title, $description)
{
    $title = config('app.name') . ' - ' . $title;

    return (object)[
        'title' => $title,
        'seoTitle' => $title,
        'seoDescription' => $description,
    ];
}

function createLogError($error_description, $table_name, $exception_message, $exception_file, $exception_line)
{

    LogError::create([
        'error_description' => $error_description,
        'table_name' => $table_name,
        'exception_message' => $exception_message,
        'exception_file' => pathinfo($exception_file, PATHINFO_FILENAME),
        'exception_line' => $exception_line,
    ]);
}

function getDefaultGuard()
{
    if (Auth::guard('recruiter')->check()) {
        return 'recruiter';
    }

    return 'web';
}

function getAdminGuard()
{
    return 'admin';
}
