@extends('shared')

@section('meta_robots', 'noindex, nofollow')

@section('viteScripts')
    @parent
    @vite(['resources/site/styles/index.scss', 'resources/app.tsx'])
@endsection
