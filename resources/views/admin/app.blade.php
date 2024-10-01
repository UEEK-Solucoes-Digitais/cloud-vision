@extends('shared')

@section('meta_robots', 'noindex, nofollow')

@section('viteScripts')
    @parent
    @vite([
        'resources/admin/styles/index.scss',
        'resources/admin/styles/reset.scss',
        'resources/app.tsx'
    ])
@endsection
