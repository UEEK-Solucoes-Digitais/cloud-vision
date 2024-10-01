<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

@php
    $appName = config('app.name');
    $appColor = '#FFFFFF';

    if (!isset($title)) {
        $title = $appName;
    }

    if (!isset($description)) {
        $description = '';
    }

    if (!isset($image)) {
        $image = '';
    }
@endphp

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="@yield('meta_robots', 'noindex, nofollow')">
    <meta name="author" content="UEEK Soluções Digitais">
    <meta name="publisher" content="UEEK Soluções Digitais">
    <meta name="copyright" content="UEEK Soluções Digitais">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2">
    <meta name="apple-mobile-web-app-title" content="{{ $appName }}">
    <meta name="application-name" content="{{ $appName }}">
    <meta name="msapplication-TileColor" content="{{ $appColor }}">
    <meta name="theme-color" content="{{ $appColor }}">

    <title inertia>{{ $title }}</title>

    <meta name="description" content="{{ $description }}">
    <meta property='og:title' content="{{ $title }}">
    <meta property='og:type' content='website'>
    <meta property='og:image' content='{{ url($image) }}'>
    <meta property='og:site_name' content="{{ $title }}">
    <meta property='og:description' content='{{ $description }}'>

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="{{ $appName }}">
    <meta name="apple-mobile-web-app-status-bar-style" content="{{ $appColor }}">

    <link rel="manifest" href="{{ url('/site.webmanifest') }}">
    <link rel="canonical" href="{{ url()->current() }}" />

    <link rel="apple-touch-startup-image" href="{{ url('/assets/images/brand/big-logo.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ url('/assets/images/brand/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ url('/assets/images/brand/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ url('/assets/images/brand/favicon-16x16.png') }}">
    <link rel="mask-icon" href="{{ url('/assets/images/brand/safari-pinned-tab.svg') }}" color="{{ $appColor }}">

    @routes
    @viteReactRefresh
    @section('viteScripts')
        @vite(['resources/site/styles/index.scss', 'resources/app.tsx'])
    @show
    @inertiaHead
</head>

<body>
    <noscript>Por favor, habilite o JavaScript no seu navegador para navegar.</noscript>

    @inertia
</body>

</html>
